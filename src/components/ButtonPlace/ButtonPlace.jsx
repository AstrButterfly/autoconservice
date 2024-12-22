import { useState, useRef, useEffect } from "react";
import classes from "./ButtonPlace.module.css";

export default function Button({ children, isFooter }) {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef();

  const handleToggleMap = () => {
    setShowMap(!showMap);
  };

  const handleClickOutside = (event) => {
    if (mapRef.current && !mapRef.current.contains(event.target)) {
      setShowMap(false);
    }
  };

  useEffect(() => {
    if (showMap) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMap]);

  return (
    <div className={classes.buttonWrapper}>
      <button className={classes.button} onClick={handleToggleMap}>
        {children}
      </button>
      {showMap && (
        <div
          ref={mapRef}
          className={`${classes.mapContainer} ${
            isFooter ? classes.openUp : classes.openDown
          }`}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d85507.57154917016!2d33.452819560469884!3d47.953565769910966!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dae1b794d90f4d%3A0x57ac7a8bcd70f9a3!2zItCQ0KEg0YHQtdGA0LLRltGBIg!5e0!3m2!1sru!2sua!4v1727213666790!5m2!1sru!2sua"
            width="600"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      )}
    </div>
  );
}
