let toggleIcone = document.querySelector(".fa-gear");
let settingBox = document.querySelector(".setting-box");
let toggleSetting = document.querySelector(".toggle-setting");

let backgrounOption = true;
let theIntervalBg;
let bgLocalStorage = localStorage.getItem("bg_option");

// Check If local Storage Is Not Empty
if (bgLocalStorage !== null) {
  if (bgLocalStorage === "true") {
    backgrounOption = true;
  } else {
    backgrounOption = false;
  }

  // Remove Active Class From All Span
  document.querySelectorAll(".bg-random-img span").forEach((element) => {
    element.classList.remove("active");
  });
  if (bgLocalStorage === "true") {
    document.querySelector(".bg-random-img .yes").classList.add("active");
  } else {
    document.querySelector(".bg-random-img .no").classList.add("active");
  }
}

// Click on Toggel Setting icon
toggleSetting.onclick = function () {
  // add and remove class spin to toggel icon by toggle()
  toggleIcone.classList.toggle("fa-spin");
  // add and remove class open to Setting Box by toggle()
  settingBox.classList.toggle("open");
};

// Select item Color [4]
let mainColor = localStorage.getItem("color_option");
// Check if local Storage has color or null [5]
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor); // [7]
  // Remove Active Class From All Color List Item  // [10]
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");
    // Add Active Class On Element With Data-Color === LocalStorage Item  [11]
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

// Switch Color [1]
let colorList = document.querySelectorAll(".color-list li");

// Loop on all list li Item [2]
colorList.forEach((li) => {
  // Click On Every List Item [3]
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color on Local Storage [6]
    localStorage.setItem("color_option", e.target.dataset.color);
    // Check on All li class active and remove it  [8]
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // Add class active to li on click only [9]
    e.target.classList.add("active");
  });
});
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
// Switch Random BackGround Option
let randomBgEl = document.querySelectorAll(".bg-random-img span");

// Loop on all Span
randomBgEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    // Remove Active Class From All Span
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // Add class active to span on click only
    e.target.classList.add("active");

    if (e.target.dataset.bgrandom === "yes") {
      backgrounOption = true;
      randomizeImgs();
      localStorage.setItem("bg_option", "true");
    } else {
      backgrounOption = false;
      clearInterval(theIntervalBg);
      localStorage.setItem("bg_option", "false");
    }
  });
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of images
let landingArray = [
  "landing-01.jpg",
  "landing-02.jpg",
  "landing-03.jpg",
  "landing-04.jpg",
  "landing-05.jpg",
  "landing-06.jpg",
  "landing-07.jpg",
  "landing-08.jpg",
];

// Function To Randomize Images
function randomizeImgs() {
  if (backgrounOption === true) {
    theIntervalBg = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * landingArray.length);
      landingPage.style.backgroundImage =
        // 'url("/images/' + landingArray[randomNumber] + ' ")';
        `url('/images/${landingArray[randomNumber]}')`;
    }, 10000);
  }
}
randomizeImgs();
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
// Select Skill Selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;
  // console.log(skillsOffsetTop)
  // 956 -- 927 حاصل طول صفحه الموقع

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // console.log(skillsOuterHeight)  // 545  طول العنصر

  // Window Height
  let windowHeight = window.innerHeight;
  // console.log(windowHeight)  // 617  طول الشاشه عموما

  // Window ScrollTop
  let windowScrollTop = window.pageYOffset;
  // console.log(windowScrollTop)
  // 856  حاصل طول صفحه الموقع حتي الوقوف بالاسكرول

  let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    allSkills.forEach((skill) => {
      skill.style.width = 0;
    });
  }
};
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// Start Gallery
// Creat Popup With Image
let ourGallery = document.querySelectorAll(".gallery .images-box img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Creat Overlay Element
    let overlay = document.createElement("div");

    // Add Class To Overlay Element
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // Creat The Popup
    let popupBox = document.createElement("div");

    // Add Class To PopupBox
    popupBox.className = "popup-box";

    // Create Heading Image
    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h4");

      // Create Text To H4
      let imgTxt = document.createTextNode(img.alt);

      // Append Img Txt To H4
      imgHeading.appendChild(imgTxt);

      // Append Img Heading To Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Creat The Image
    let popupImages = document.createElement("img");

    // Set Image Source
    popupImages.src = img.src;

    // Append Popup Image To The Popup Box
    popupBox.appendChild(popupImages);

    // Append Popup Box To The Body
    document.body.appendChild(popupBox);

    // Creat Button Close Image
    let closeBtn = document.createElement("span");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "X";
    popupBox.appendChild(closeBtn);
  });
});

// Close PopUp
document.addEventListener("click", (ele) => {
  if (ele.target.className == "close-btn") {
    ele.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
// End Gallery
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

