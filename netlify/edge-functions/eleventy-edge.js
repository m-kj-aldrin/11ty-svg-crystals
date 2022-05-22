import { EleventyEdge } from "eleventy:edge";
import precompiledAppData from "./_generated/eleventy-edge-app-data.js";

// filters - -
import { irand, frand, angleToV } from "../../11ty/filters.mjs";

export default async (request, context) => {
  try {
    let edge = new EleventyEdge("edge", {
      request,
      context,
      precompiled: precompiledAppData,

      // default is [], add more keys to opt-in e.g. ["appearance", "username"]
      cookies: [],
    });

    const url = new URL(request.url);
    const nCrystals = url.searchParams.get("n-crystals") || 4;
    // const yStride = url.searchParams.get('y-stride') || 2

    edge.config(config => {
      config.addNunjucksFilter("irand", irand);
      config.addNunjucksFilter("frand", frand);
      config.addNunjucksFilter("angleToV", angleToV);

      config.addGlobalData("nCrystals", nCrystals);

    });

    const res = await edge.handleResponse();
    const b = await res.text();
    const mini = b
      .replace(/\>[\r\n ]+\</g, "><")
      .replace(/(<.*?>)|\s+/g, (m, $1) => ($1 ? $1 : " "))
      .trim();

    return new Response(mini, res);
  } catch (e) {
    console.log("ERROR", { e });
    return context.next(e);
  }
};
