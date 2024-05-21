import * as Ariakit from "@ariakit/react";
import { matchSorter } from "match-sorter";
import { startTransition, useMemo, useRef, useState } from "react";
import { languages } from "./list.ts";
import "./SelectCombobox.css";
import { Virtualizer } from "virtua";

export default function Example() {
  const [searchValue, setSearchValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    return matchSorter(languages, searchValue, {
      keys: ["name"],
    });
  }, [searchValue]);

  return (
    <div className="wrapper">
      <Ariakit.ComboboxProvider
        resetValueOnHide
        setValue={(value) => {
          startTransition(() => {
            setSearchValue(value);
          });
        }}
      >
        <Ariakit.SelectProvider>
          <Ariakit.SelectLabel>Language</Ariakit.SelectLabel>
          <Ariakit.Select className="button" />
          <Ariakit.SelectPopover
            gutter={4}
            sameWidth
            className="popover"
            ref={scrollRef}
          >
            <div className="combobox-wrapper">
              <Ariakit.Combobox
                autoSelect
                placeholder="Search..."
                className="combobox"
              />
            </div>
            <Ariakit.ComboboxList>
              <Virtualizer
                count={matches.length}
                scrollRef={scrollRef}
                overscan={10}
              >
                {(index) => {
                  const item = matches[index];
                  if (!item) throw new Error("No item");

                  return (
                    <Ariakit.SelectItem
                      key={item.code}
                      value={item.name}
                      className="select-item"
                      render={<Ariakit.ComboboxItem />}
                    />
                  );
                }}
              </Virtualizer>
            </Ariakit.ComboboxList>
          </Ariakit.SelectPopover>
        </Ariakit.SelectProvider>
      </Ariakit.ComboboxProvider>
    </div>
  );
}
