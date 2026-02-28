"use client";

import s from "./blog.module.scss";
import { BlogCard, Size } from "@/components/layouts/blogCard/blogCard";
import { FilterButton } from "@/components/ui/buttons/filterButton/filterButton";
import { useCallback, useEffect, useState } from "react";
import { clsx } from "clsx";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/buttons/button/button";
import { BigBubble } from "@/components/video/bigBubble";
import { SmallBubble } from "@/components/video/smallBubble";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { api } from "@/common/api";
import { Article } from "@/common/types";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader } from "@/components/ui/loader/loader";
import { createQueryString } from "@/common/commonFunctions";

gsap.registerPlugin(ScrollTrigger);

export const Blog = () => {
  const defaultFilter = "Все";
  const defaultPage = 1;
  const [articlesData, setArticles] =
    useState<(Article & { isNew: boolean })[]>();
  const [filters, setFilters] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentFilter, setCurrentFilter] = useState<string>(defaultFilter);
  const [page, setPage] = useState(defaultPage);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const filter = searchParams.get("filter");
    if (filter) {
      setCurrentFilter(filter);
    }

    const getArticles = async () => {
      const articles = await api.getArticles(page, filter);
      const startArticles = articles?.posts?.map((article) => ({
        ...article,
        isNew: true,
      }));
      setTotal(articles?.total || 0);
      setTimeout(() => {
        setArticles(startArticles);
      }, 400);
    };

    const getFilters = async () => {
      const filters = await api.getArticlesFilters();
      if (!filters) return null;
      setFilters(filters);
    };

    Promise.all([getArticles(), getFilters()]);
  }, []);

  useEffect(() => {
    if (!articlesData || !articlesData?.length) return;

    ScrollTrigger.refresh();
    gsap.set(".fullWidth.new", {
      y: 100,
      opacity: 0,
    });
    gsap.set(".right.new", {
      x: 100,
      opacity: 0,
    });
    gsap.set(".left.new", {
      x: -100,
      opacity: 0,
    });

    const triggers = ScrollTrigger.batch(".blogCard.new", {
      interval: 0.4,
      onEnter: (batch) => {
        gsap.to(batch, {
          y: 0,
          x: 0,
          opacity: 1,
          stagger: 0.4,
          overwrite: true,
        });
      },
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [articlesData]);

  const createQueryStringMemo = useCallback(createQueryString, []);

  if (!articlesData) return null;

  const getMoreArticles = async () => {
    setLoading(true);
    const newArticles = await api.getArticles(page + 1, currentFilter);
    setLoading(false);
    setPage(page + 1);
    if (!newArticles) return null;
    setArticles([
      ...articlesData.map((article) => ({ ...article, isNew: false })),
      ...newArticles?.posts?.map((article) => ({ ...article, isNew: true })),
    ]);
    ScrollTrigger.refresh();
  };

  const setFilter = async (filter: string) => {
    if (filter === currentFilter) return null;
    setLoading(true);
    setCurrentFilter(filter);
    const newArticles = await api.getArticles(
      defaultPage,
      filter === defaultFilter ? null : filter,
    );
    setLoading(false);
    if (filter === defaultFilter) {
      window.history.replaceState(null, "", pathname);
    } else {
      window.history.replaceState(
        null,
        "",
        pathname + "?" + createQueryStringMemo("filter", filter, searchParams),
      );
    }
    if (!newArticles) return null;
    setArticles(
      newArticles.posts.map((article) => ({ ...article, isNew: true })),
    );
  };

  const filterButtons = filters.map((button) => {
    return (
      <FilterButton
        key={button}
        value={button}
        active={button === currentFilter}
        onClick={() => setFilter(button)}
      >
        {button}
      </FilterButton>
    );
  });
  const articles = articlesData.map((article, index) => {
    if (index === 0) {
      return (
        <BlogCard
          size={"fullWidth"}
          key={uuid()}
          priority
          index={index}
          articleId={article.slug}
          tags={article.categories}
          img={article.image}
          header={article.title}
          description={article.excerpt}
          className={article.isNew ? "new" : ""}
        />
      );
    }

    if (index === 1) {
      return (
        <BlogCard
          size={"small"}
          key={uuid()}
          index={index}
          articleId={article.slug}
          tags={article.categories}
          img={article.image}
          header={article.title}
          description={article.excerpt}
          className={article.isNew ? "new" : ""}
        />
      );
    }

    const modIndex = (index - 2) % 4;
    let size;
    if (modIndex === 0 || modIndex === 1) {
      size = "medium";
    } else {
      size = "small";
    }

    return (
      <BlogCard
        size={size as Size}
        key={uuid()}
        index={index}
        articleId={article.slug}
        tags={article.categories}
        img={article.image}
        header={article.title}
        description={article.excerpt}
        className={article.isNew ? "new" : ""}
      />
    );
  });

  const firstArticle = articles[0];
  articles.shift();

  return (
    <>
      <div className={clsx("mainContainer", s.blogPage)}>
        <BigBubble className={s.bigBubble} />
        <div className={s.header}>
          <h1>Блог</h1>
          <div className={s.filterButtons}>{filterButtons}</div>
        </div>
        <div className={s.firstArticle}>{firstArticle}</div>
        <div className={s.articles}>{articles}</div>
        {loading && (
          <div className={s.loaderContainer}>
            <Loader />
          </div>
        )}
        {articles.length + 1 < total && (
          <Button
            text={"Загрузить ещё"}
            className={s.loadMoreButton}
            onClick={getMoreArticles}
          />
        )}
        <div className={s.smallBubbleContainer}>
          <SmallBubble className={s.smallBubble} />
        </div>
      </div>
    </>
  );
};
