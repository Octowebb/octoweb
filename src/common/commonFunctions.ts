import { Metadata } from "next";
import {
  OpenGraph,
  OpenGraphType,
} from "next/dist/lib/metadata/types/opengraph-types";
import { Robots } from "next/dist/lib/metadata/types/metadata-types";
import type { Twitter } from "next/dist/lib/metadata/types/twitter-types";
import { SeoData, ServerError } from "@/common/types";
import { ReadonlyURLSearchParams } from "next/dist/client/components/navigation.react-server";
import { notFound } from "next/navigation";

export const formatNumber = (index: number) => {
  const number = index + 1;
  return number > 9 ? String(number) : `0${number}`;
};

export const formatPhoneNumber = (number: string) => {
  return number.replace(/[^\d+]+/g, "");
};

export const createQueryString = (
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);

  return params.toString();
};

export const checkError = (serverResponse: ServerError | unknown) => {
  if (!serverResponse) return null;
  if (typeof serverResponse === "object" && "code" in serverResponse) {
    const typedResponse = serverResponse as unknown as ServerError;
    if (typedResponse?.data?.status === 404) {
      notFound();
    }
    return null;
  }
};

export const getMetaDataObj = (yoastJson: SeoData) => {
  const meta: Metadata = {};
  if (!yoastJson) return {};
  if (yoastJson.title !== undefined) {
    meta.title = yoastJson.title;
  }
  if (yoastJson.description) {
    meta.description = yoastJson.description;
  }
  if (yoastJson.canonical) {
    meta.alternates = {};
    meta.alternates.canonical = yoastJson.canonical;
  }
  //open graph
  if (yoastJson.og_locale) {
    meta.openGraph = meta.openGraph || {};
    meta.openGraph.locale = yoastJson.og_locale;
  }
  if (yoastJson.og_type) {
    meta.openGraph = (meta.openGraph || {}) as OpenGraph;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    meta.openGraph.type = yoastJson.og_type as OpenGraphType;
  }
  if (yoastJson.og_title) {
    meta.openGraph = meta.openGraph || {};
    meta.openGraph.title = yoastJson.og_title;
  }
  if (yoastJson.og_description) {
    meta.openGraph = meta.openGraph || {};
    meta.openGraph.description = yoastJson.og_description;
  }
  if (yoastJson.og_url) {
    meta.openGraph = meta.openGraph || {};
    meta.openGraph.url = yoastJson.og_url;
  }
  if (yoastJson.og_site_name) {
    meta.openGraph = meta.openGraph || {};
    meta.openGraph.siteName = yoastJson.og_site_name;
  }
  if (yoastJson.og_image) {
    meta.openGraph = meta.openGraph || {};
    meta.openGraph.images = yoastJson.og_image;
  }
  if (yoastJson.article_modified_time) {
    meta.openGraph = meta.openGraph || {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    meta.openGraph.modifiedTime = yoastJson.article_modified_time;
  }
  //robots
  if (yoastJson.robots?.index === "index") {
    meta.robots = (meta.robots || {}) as Robots;
    meta.robots.index = true;
  }
  if (yoastJson.robots?.follow === "follow") {
    meta.robots = (meta.robots || {}) as Robots;
    meta.robots.follow = true;
  }
  if (yoastJson.robots?.["max-snippet"]) {
    meta.robots = (meta.robots || {}) as Robots;
    meta.robots.googleBot = meta.robots.googleBot || {};
    const splittedString = yoastJson.robots?.["max-snippet"].split(":");
    const value = splittedString[splittedString.length - 1];
    (meta.robots.googleBot as Record<string, unknown>)["max-snippet"] =
      Number(value);
  }
  if (yoastJson.robots?.["max-video-preview"]) {
    meta.robots = (meta.robots || {}) as Robots;
    meta.robots.googleBot = meta.robots.googleBot || {};
    const splitString = yoastJson.robots?.["max-video-preview"].split(":");
    const value = splitString[splitString.length - 1];
    (meta.robots.googleBot as Record<string, unknown>)["max-video-preview"] =
      value;
  }
  if (yoastJson.robots?.["max-image-preview"]) {
    meta.robots = (meta.robots || {}) as Robots;
    meta.robots.googleBot = meta.robots.googleBot || {};
    const splitString = yoastJson.robots?.["max-image-preview"].split(":");
    const value = splitString[splitString.length - 1];
    (meta.robots.googleBot as Record<string, unknown>)["max-image-preview"] =
      value;
  }
  //twitter
  if (yoastJson.twitter_card) {
    meta.twitter = (meta.twitter || {}) as Twitter;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    meta.twitter.card = yoastJson.twitter_card;
  }
  if (yoastJson.twitter_misc) {
    meta.other = meta.other || {};

    Object.entries(yoastJson.twitter_misc).forEach(([label, data], index) => {
      const labelKey = `twitter:label${index + 1}`;
      const dataKey = `twitter:data${index + 1}`;
      meta.other![labelKey] = label;
      meta.other![dataKey] = data;
    });
  }

  return meta;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
