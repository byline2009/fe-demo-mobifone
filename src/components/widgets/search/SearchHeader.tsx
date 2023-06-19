import { IonIcon } from "@ionic/react";
import React, { useState, useEffect } from "react";
import { closeCircleOutline } from "ionicons/icons";
const SearchHeader = ({ keyQuery }: any) => {
  const [keywords, setKeywords] = useState<string>(keyQuery || "");

  useEffect(() => {
    if (keywords) {
    }
  }, [keywords]);

  const submitSearch = (e: any) => {
    if (e.key === "Enter") {
      (document.activeElement as HTMLElement).blur();
    }
  };

  return (
    <div className="search-header">
      <div className="search-text">
        {keywords.length > 0 && (
          <button className="clearF" onClick={() => setKeywords("")}>
            <IonIcon className="ion-icon" icon={closeCircleOutline}></IonIcon>
          </button>
        )}
        <i className="icon-search"></i>
        <input
          type="text"
          name="searchName"
          placeholder="Nhập thông tin..."
          value={keywords || ""}
          onChange={(e: any) => setKeywords(e.target.value)}
          onKeyDown={(e: any) => submitSearch(e)}
        />
      </div>
      <button className="search-submit" onClick={() => {}}>
        Tìm kiếm
      </button>
    </div>
  );
};
export default SearchHeader;
