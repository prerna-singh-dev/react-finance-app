import { useState } from "react";
import { emojis } from "../data/emojiCategories";
function EmojiTab({ emojiChange }) {
  const [showTab, setShowTab] = useState("food");
  const handleTabChange = (activeTab) => {
    setShowTab(activeTab);
  };

  return (
    <>
      <div>
        <ul className="flex bg-pink-100">
          {Object.entries(emojis).map((emoji) => (
            <li
              className="text-xs px-2.5 py-1.5 last-of-type:border-0 border-r-2 border-white capitalize"
              key={emoji[0]}
            >
              <a
                className="cursor-pointer"
                onClick={() => handleTabChange(emoji[0])}
              >
                {emoji[0]}
              </a>
            </li>
          ))}
        </ul>
        <div>
          {Object.entries(emojis).map((emoji) => (
            <div
              key={"emoji_" + emoji[0]}
              className={`my-3 ${emoji[0] === showTab ? "block" : "hidden"}`}
            >
              {emoji[1].map((emoji) => (
                <button
                  key={emoji}
                  className="text-3xl px-3 py-1.5 mx-1 focus:border hover:border-gray-200  focus:bg-gray-100  focus:border-gray-200"
                  onClick={() => emojiChange(emoji)}
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
