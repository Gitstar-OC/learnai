import { source } from "@/app/source";
import { RainbowButton } from "@/components/ui/rainbow-button";
import type { Metadata } from "next";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";
import { Steps, Step } from "fumadocs-ui/components/steps";
import { Tabs, Tab } from "fumadocs-ui/components/tabs";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { TbSettings } from "react-icons/tb";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug ? params.slug.join("/") : ""; 
  const page = source.getPage(params.slug);
  
  if (!page) notFound();

  const MDX = page.data.body;
  const path = `/learn/${page.file.path}`;

  return (
    <DocsPage 
      tableOfContent={{
        enabled: page.file.path !== "api-reference.mdx",
        footer: (
          <>
            <div>
              <Separator />
              <a
                href={`https://github.com/gitstar-oc/learnai/blob/master${path}`}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-baseline text-xs text-muted-foreground hover:text-foreground mt-4"
              >
                Edit on Github <ArrowSquareOut className="ml-1 size-3" />
              </a>
              <a
                href="https://github.com/gitstar-oc/learnai/issues/new?title=Feedback%20for%20%E2%80%9Clearnai%E2%80%9D&labels=feedback"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-baseline text-xs text-muted-foreground hover:text-foreground mt-2"
              >
                Question? Give us feedback{" "}
                <FaArrowRightLong className="ml-1 mb-3 size-3" />
              </a>
              {/* <span className="opacity-70 hover:opacity-100 cursor-pointer group text-xs flex">
                <TbSettings className="size-3 mt-[1px] mr-1 transition-transform duration-300 ease-in-out group-hover:rotate-[360deg] group-hover:scale-125" />
                Change Appearance
              </span> */}
              <a href="https://github.com/gitstar-oc/mindect" rel="noopener noreferrer" target="_blank">
                <RainbowButton>
                  <h3 className="text-white dark:text-black mt-none text-[16px] justify-center items-center bottom-3 flex">
                    Contribute to Mindect <IoIosArrowForward className="ml-1 transition-transform duration-300 ease-in-out transform group-hover:translate-x-1" />
                  </h3>
                </RainbowButton>
              </a>
            </div>
          </>
        ),
      }}
      toc={page.data.toc}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            Steps,
            Step,
            Tabs,
            Tab,
            Accordions,
            Accordion,
            img: (props) => <ImageZoom {...(props as any)} />,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const slug = params.slug ? params.slug.join("/") : "index"; // Join slugs for the path
  const page = source.getPage(params.slug);
  
  if (page == null) notFound();

  const description =
    page.data.description ?? "Free Site to learn AI, Machine Learning and Deep Learning. Anytime, Anywhere.";

  return {
    title: page.data.title,
    description,
    openGraph: {
      url: `/learn/${slug}`,
    },
  } satisfies Metadata;
}

