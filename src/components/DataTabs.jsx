import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function DataTabs() {
    const categories = [
      {
        name: "Recent",
        posts: [
          {
            id: 1,
            title: "Does drinking coffee make you smarter?",
            date: "5h ago",
            commentCount: 5,
            shareCount: 2,
          },
          {
            id: 2,
            title: "So you've bought coffee... now what?",
            date: "2h ago",
            commentCount: 3,
            shareCount: 2,
          },
        ],
      },
      {
        name: "Popular",
        posts: [
          {
            id: 1,
            title: "Is tech making coffee better or worse?",
            date: "Jan 7",
            commentCount: 29,
            shareCount: 16,
          },
          {
            id: 2,
            title: "The most innovative things happening in coffee",
            date: "Mar 19",
            commentCount: 24,
            shareCount: 12,
          },
        ],
      },
      {
        name: "Trending",
        posts: [
          {
            id: 1,
            title: "Ask Me Anything: 10 answers to your questions about coffee",
            date: "2d ago",
            commentCount: 9,
            shareCount: 5,
          },
          {
            id: 2,
            title: "The worst advice we've ever heard about coffee",
            date: "4d ago",
            commentCount: 1,
            shareCount: 2,
          },
        ],
      },
    ];
  return (
    <div className="w-full mt-4 flex items-center justify-start">
        <TabGroup>
          <TabList className="flex gap-4">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full border-2 border-thirdD py-0 px-2 text-sm font-semibold text-thirdD data-[selected]:border-fourthD data-[selected]:border-fourthD data-[hover]:text-fourthD  data-[hover]:border-fourthD bg-transparent"
              >
                {name}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
    </div>
  );
}
