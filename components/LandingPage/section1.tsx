"use client";

import TypeWriterEffect from "../ui/TypeWriterEffect";

const FeatureCardContent = [
  // {
  //   key: "setup",
  //   icon: "🚀",
  //   title: "4-Step Setup",
  //   description:
  //     "Install, configure API key, pull translations, and start using. That's it. No complex configuration files.",
  // },
  // {
  //   key: "ai-translation",
  //   icon: "🤖",
  //   title: "AI Translation Engine",
  //   description:
  //     "Powered by advanced AI to deliver context-aware translations that actually make sense in your app.",
  // },
  // {
  //   key: "type-safe",
  //   icon: "🛡️",
  //   title: "Type-Safe Keys",
  //   description:
  //     "Auto-generated keys with required parameters. Catch translation errors at compile time, not runtime.",
  // },
  // {
  //   key: "sync",
  //   icon: "🔄",
  //   title: "Automatic Sync",
  //   description:
  //     "One command pulls all translations. No manual file management. Always stay in sync with your team.",
  // },
  // {
  //   key: "pluralization",
  //   icon: "🔢",
  //   title: "Advanced Pluralization",
  //   description:
  //     "Handle complex plural rules for any language, including nested plurals. We've got the edge cases covered.",
  // },
  // {
  //   key: "formatting",
  //   icon: "💰",
  //   title: "Built-in Formatting",
  //   description:
  //     "Format numbers, dates, currencies, and percentages automatically based on locale. Powered by intl.",
  // },
  {
    key: "problem 1",
    icon: "🔧",
    title: "Multiple tools juggling",
    description:
      "One tool for translations, another for client integration, plus CI/CD scripts. Why can't it just be one simple tool?",
  },
  {
    key: "problem 2",
    icon: "⏰",
    title: "Hours wasted on setup",
    description:
      "Spending more time configuring localization than building features. There has to be a better way.",
  },
  {
    key: "problem 3",
    icon: "📦",
    title: "Manual file downloads",
    description:
      "Download ZIP files, extract, copy to assets, update pubspec.yaml, repeat for every update.",
  },
  {
    key: "problem 4",
    icon: "🔢",
    title: "Broken plural handling",
    description: `"1 item(s)" anyone? Most tools can't handle complex plurals or nested cases that real apps need.`,
  },
  {
    key: "problem 5",
    icon: "💥",
    title: "Magic strings everywhere",
    description:
      "Runtime crashes from typos, no auto-complete, no compile-time safety. Welcome to localization hell.",
  },
  {
    key: "problem 6",
    icon: "🔍",
    title: "String Extraction Nightmare",
    description:
      "Manually finding and extracting hardcoded strings, missing context, losing track of what needs translation.",
  },
];

export default function EverythingYouNeed() {
  // function atvImg() {
  //   var d = document,
  //     de = d.documentElement,
  //     bd = d.getElementsByTagName("body")[0],
  //     htm = d.getElementsByTagName("html")[0],
  //     win = window,
  //     imgs = d.querySelectorAll(".atvImg"),
  //     totalImgs = imgs.length,
  //     supportsTouch = "ontouchstart" in win || navigator.msMaxTouchPoints;

  //   if (totalImgs <= 0) {
  //     return;
  //   }

  //   for (var l = 0; l < totalImgs; l++) {
  //     var thisImg = imgs[l],
  //       layerElems = thisImg.querySelectorAll(".atvImg-layer"),
  //       totalLayerElems = layerElems.length;

  //     if (totalLayerElems <= 0) {
  //       continue;
  //     }

  //     while (thisImg.firstChild) {
  //       thisImg.removeChild(thisImg.firstChild);
  //     }

  //     var containerHTML = d.createElement("div"),
  //       shineHTML = d.createElement("div"),
  //       shadowHTML = d.createElement("div"),
  //       layersHTML = d.createElement("div"),
  //       layers = [];

  //     thisImg.id = "atvImg__" + l;
  //     containerHTML.className = "atvImg-container";
  //     shineHTML.className = "atvImg-shine";
  //     shadowHTML.className = "atvImg-shadow";
  //     layersHTML.className = "atvImg-layers";

  //     for (var i = 0; i < totalLayerElems; i++) {
  //       var layer = d.createElement("div"),
  //         imgSrc = layerElems[i].getAttribute("data-img");

  //       layer.className = "atvImg-rendered-layer";
  //       layer.setAttribute("data-layer", i);
  //       layer.style.backgroundImage = "url(" + imgSrc + ")";
  //       layersHTML.appendChild(layer);

  //       layers.push(layer);
  //     }

  //     containerHTML.appendChild(shadowHTML);
  //     containerHTML.appendChild(layersHTML);
  //     containerHTML.appendChild(shineHTML);
  //     thisImg.appendChild(containerHTML);

  //     var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
  //     thisImg.style.transform = "perspective(" + w * 3 + "px)";

  //     if (supportsTouch) {
  //       win.preventScroll = false;

  //       (function (_thisImg, _layers, _totalLayers, _shine) {
  //         thisImg.addEventListener("touchmove", function (e) {
  //           if (win.preventScroll) {
  //             e.preventDefault();
  //           }
  //           processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);
  //         });
  //         thisImg.addEventListener("touchstart", function (e) {
  //           win.preventScroll = true;
  //           processEnter(e, _thisImg);
  //         });
  //         thisImg.addEventListener("touchend", function (e) {
  //           win.preventScroll = false;
  //           processExit(e, _thisImg, _layers, _totalLayers, _shine);
  //         });
  //       })(thisImg, layers, totalLayerElems, shineHTML);
  //     } else {
  //       (function (_thisImg, _layers, _totalLayers, _shine) {
  //         thisImg.addEventListener("mousemove", function (e) {
  //           processMovement(e, false, _thisImg, _layers, _totalLayers, _shine);
  //         });
  //         thisImg.addEventListener("mouseenter", function (e) {
  //           processEnter(e, _thisImg);
  //         });
  //         thisImg.addEventListener("mouseleave", function (e) {
  //           processExit(e, _thisImg, _layers, _totalLayers, _shine);
  //         });
  //       })(thisImg, layers, totalLayerElems, shineHTML);
  //     }
  //   }

  //   function processMovement(
  //     e,
  //     touchEnabled,
  //     elem,
  //     layers,
  //     totalLayers,
  //     shine
  //   ) {
  //     var bdst = bd.scrollTop || htm.scrollTop,
  //       bdsl = bd.scrollLeft,
  //       pageX = touchEnabled ? e.touches[0].pageX : e.pageX,
  //       pageY = touchEnabled ? e.touches[0].pageY : e.pageY,
  //       offsets = elem.getBoundingClientRect(),
  //       w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth,
  //       h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight,
  //       wMultiple = 320 / w,
  //       offsetX = 0.52 - (pageX - offsets.left - bdsl) / w,
  //       offsetY = 0.52 - (pageY - offsets.top - bdst) / h,
  //       dy = pageY - offsets.top - bdst - h / 2,
  //       dx = pageX - offsets.left - bdsl - w / 2,
  //       yRotate = (offsetX - dx) * (0.07 * wMultiple),
  //       xRotate = (dy - offsetY) * (0.1 * wMultiple),
  //       imgCSS = "rotateX(" + xRotate + "deg) rotateY(" + yRotate + "deg)",
  //       arad = Math.atan2(dy, dx),
  //       angle = (arad * 180) / Math.PI - 90;

  //     if (angle < 0) {
  //       angle = angle + 360;
  //     }

  //     if (elem.firstChild.className.indexOf(" over") != -1) {
  //       imgCSS += " scale3d(1.07,1.07,1.07)";
  //     }
  //     elem.firstChild.style.transform = imgCSS;

  //     shine.style.background =
  //       "linear-gradient(" +
  //       angle +
  //       "deg, rgba(255,255,255," +
  //       ((pageY - offsets.top - bdst) / h) * 0.4 +
  //       ") 0%,rgba(255,255,255,0) 80%)";
  //     shine.style.transform =
  //       "translateX(" +
  //       offsetX * totalLayers -
  //       0.1 +
  //       "px) translateY(" +
  //       offsetY * totalLayers -
  //       0.1 +
  //       "px)";

  //     var revNum = totalLayers;
  //     for (var ly = 0; ly < totalLayers; ly++) {
  //       layers[ly].style.transform =
  //         "translateX(" +
  //         offsetX * revNum * ((ly * 2.5) / wMultiple) +
  //         "px) translateY(" +
  //         offsetY * totalLayers * ((ly * 2.5) / wMultiple) +
  //         "px)";
  //       revNum--;
  //     }
  //   }

  //   function processEnter(e, elem) {
  //     elem.firstChild.className += " over";
  //   }

  //   function processExit(e, elem, layers, totalLayers, shine) {
  //     var container = elem.firstChild;

  //     container.className = container.className.replace(" over", "");
  //     container.style.transform = "";
  //     shine.style.cssText = "";

  //     for (var ly = 0; ly < totalLayers; ly++) {
  //       layers[ly].style.transform = "";
  //     }
  //   }
  // }

  // useEffect(() => {
  //   atvImg();
  // }, []);

  return (
    <section className="features">
      <h2 className="section-title text-4xl lg:text-5xl">
        <TypeWriterEffect words={["Why is Flutter localization so painful?"]} />
      </h2>
      <p className="section-subtitle">We've been there too!</p>

      <div className="feature-grid">
        {FeatureCardContent?.map((featureCard) => {
          const { icon, title, key, description } = featureCard;
          return (
            <div key={key} className="card">
              <div className="icon">{icon}</div>
              <h3 className="heading">{title}</h3>
              <p>{description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
