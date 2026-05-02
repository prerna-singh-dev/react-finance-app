import { useMemo, useRef, useState } from "react";
import { emojis } from "../data/emojiCategories";
function EmojiTab({ emojiChange }) {
  const [showTab, setShowTab] = useState("food");
  const tabRefs = useRef({});

  const tabs = useMemo(() => Object.keys(emojis), []);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

  const handleTabChange = (activeTab) => setShowTab(activeTab);

  const focusTabAt = (index) => {
    const key = tabs[index];
    tabRefs.current[key]?.focus?.();
  };

  const onTabKeyDown = (e, currentIndex) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      focusTabAt((currentIndex + 1) % tabs.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusTabAt((currentIndex - 1 + tabs.length) % tabs.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusTabAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusTabAt(tabs.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabChange(tabs[currentIndex]);
    }
  };

  return (
    <>
      <div>
        <ul
          className="flex flex-nowrap gap-2 sm:gap-0.5 overflow-x-auto overflow-y-hidden border-b-2 pb-2 px-1 sm:px-0 whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-1 md:overflow-visible"
          role="tablist"
          aria-label="Emoji categories"
        >
          {Object.entries(emojis).map((emoji, index) => (
            <li
              className={`text-xs px-1 py-1.5 lg:px-1 lg:py-1.5 lg:text-[11px] capitalize relative shrink-0 lg:shrink lg:flex-1 lg:min-w-0 lg:text-center
                after:hidden lg:after:block after:absolute after:w-2 after:h-2 after:rounded-full after:-bottom-2 after:left-0 after:right-0 after:mx-auto after:translate-y-1/2 after:z-10
                
                ${
                  showTab === emoji[0]
                    ? " bg-pink-100 after:bg-pink-700"
                    : "bg-gray-100 after:bg-gray-300"
                }`}
              key={emoji[0]}
            >
              <button
                ref={(el) => {
                  tabRefs.current[emoji[0]] = el;
                }}
                id={`emoji-tab-${emoji[0]}`}
                aria-controls={`emoji-panel-${emoji[0]}`}
                aria-selected={showTab === emoji[0]}
                role="tab"
                tabIndex={showTab === emoji[0] ? 0 : -1}
                className={`cursor-pointer block w-full truncate capitalize ${focusRing}`}
                onClick={() => handleTabChange(emoji[0])}
                onKeyDown={(e) => onTabKeyDown(e, index)}
                type="button"
              >
                {emoji[0]}
              </button>
            </li>
          ))}
        </ul>
        <div className="bg-pink-50 my-2">
          {Object.entries(emojis).map((emoji) => (
            <div
              key={"emoji_" + emoji[0]}
              className={`py-3 ${
                emoji[0] === showTab ? "block" : "hidden"
              } flex flex-wrap justify-start`}
              role="tabpanel"
              id={`emoji-panel-${emoji[0]}`}
              aria-labelledby={`emoji-tab-${emoji[0]}`}
            >
              {emoji[1].map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  className={`text-3xl px-3 py-1.5 mx-1  hover:border-pink-200 focus:bg-pink-100 focus:border-pink-200 ${focusRing}`}
                  onClick={() => emojiChange(emoji)}
                  aria-label={`Select ${emoji} icon`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default EmojiTab;
