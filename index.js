const arrObject = [
  {
    question: `What is Frontend Mentor, and how will it help me?`,
    answer: `Frontend Mentor offers realistic coding challenges to help developers improve their 
  frontend coding skills with projects in HTML, CSS, and JavaScript. It's suitable for all levels and ideal for portfolio building.`,
  },
  {
    question: `Is Frontend Mentor free?`,
    answer: `Yes, Frontend Mentor offers both free and premium coding challenges, with the free 
  option providing access to a range of projects suitable for all skill levels.`,
  },
  {
    question: `Can I use Frontend Mentor projects in my portfolio?`,
    answer: `Yes, you can use projects completed on Frontend Mentor in your portfolio. It's an excellent
  way to showcase your skills to potential employers!`,
  },
  {
    question: `How can I get help if I'm stuck on a challenge?`,
    answer: `The best place to get help is inside Frontend Mentor's Discord community. There's a help 
  channel where you can ask questions and seek support from other community members.`,
  },
];

class Accordion {
  constructor(question, answer, initiallyOpen = false) {
    this.directory = document.getElementById("faq-container");
    this.button = null;
    this.isOpen = initiallyOpen;
    this.src;
    this.ref;
    this.contentHeight;
    this.createAccordion(question, answer);
  }
  createAccordion(question, answer) {
    const accordion = document.createElement("div");
    accordion.classList.add("accordion");
    this.directory.append(accordion);

    // Create button element and bind it
    const buttonElement = document.createElement("button");
    this.button = buttonElement;
    this.button.textContent = question;

    const imgButtonElement = document.createElement("img");
    imgButtonElement.src = this.isOpen
      ? "./assets/images/icon-minus.svg"
      : "./assets/images/icon-plus.svg";
    imgButtonElement.setAttribute("alt", "button icon");
    this.button.append(imgButtonElement);
    accordion.append(this.button);

    // Create accordion content
    const divElement = document.createElement("div");
    const textElement = document.createElement("p");
    textElement.textContent = answer;
    divElement.append(textElement);
    accordion.append(divElement);

    // Set the initial accordion height depending on initial state
    this.ref = divElement;
    const height = textElement.getBoundingClientRect().height;
    this.contentHeight = height;
    this.ref.style.height = this.isOpen ? `${height}px` : `0`;
    this.initiateEvent();
  }

  toggleAccordion() {
    this.isOpen = !this.isOpen;
    const img = this.button.querySelector("img");
    img.src = this.isOpen
      ? "./assets/images/icon-minus.svg"
      : "./assets/images/icon-plus.svg";
    if (this.isOpen) {
      this.ref.style.height = `${this.contentHeight}px`;
    } else this.ref.style.height = `0`;
  }

  initiateEvent() {
    this.button.addEventListener("click", () => this.toggleAccordion());
    window.addEventListener("resize", () => this.onResize());
    window.addEventListener("load", () => this.onResize());
  }

  onResize() {
    this.contentHeight = this.ref
      .querySelector("p")
      .getBoundingClientRect().height;
    if (this.isOpen) {
      this.ref.style.height = `${this.contentHeight}px`;
    } else this.ref.style.height = `0`;
  }
}

arrObject.map((data, i) => {
  i === 0
    ? new Accordion(data.question, data.answer, true)
    : new Accordion(data.question, data.answer);
});
