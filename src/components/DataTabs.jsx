import { Tab, TabGroup, TabList } from "@headlessui/react";

export default function DataTabs({ data, handleCurrentDataKey, currentDataKey }) {

  return (
    <div className="w-full mt-4 flex items-center justify-start">
      <TabGroup>
        <TabList className="flex gap-4">
          {data.map((item) => (
            <Tab
              key={item}
              onClick={() => currentDataKey != item ? handleCurrentDataKey(item.toLowerCase()) : ""}
              className="rounded-full border-2 border-thirdD py-0 px-2 text-sm font-semibold text-thirdD data-[selected]:border-fourthD data-[selected]:text-fourthD data-[selected]:border-fourthD data-[hover]:text-fourthD  data-[hover]:border-fourthD bg-transparent"
            >
              {item}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  );
}
