import { getMembersData } from "./storage.js";

export function handleSearchMember(renderResultTable) {
  const searchInputs = document.querySelectorAll(".filter-section input");
  const genderDropdown = document.querySelector(".custom-dropdown.gender");
  const roleDropdown = document.querySelector(".custom-dropdown.role");

  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");

  searchBtn.addEventListener("click", () => {
    const [
      nameInput,
      englishNameInput,
      githubInput,
      codeReviewGroupInput,
      ageInput,
    ] = searchInputs;
    const membersData = getMembersData();

    if (englishNameInput.value && !/^[A-Za-z]+$/.test(englishNameInput.value)) {
      alert("영문 이름은 영어만 입력할 수 있습니다.");
      return;
    }

    if (githubInput.value && !/^[A-Za-z]+$/.test(githubInput.value)) {
      alert("깃허브 아이디는 영어만 입력할 수 있습니다.");
      return;
    }

    if (codeReviewGroupInput.value) {
      const codeReviewGroup = Number(codeReviewGroupInput.value);
      if (
        !Number.isInteger(codeReviewGroup) ||
        codeReviewGroup < 1 ||
        codeReviewGroup > 9
      ) {
        alert("금잔디 조는 1부터 9 사이의 정수만 입력 가능합니다.");
        return;
      }
    }

    if (ageInput.value) {
      const age = Number(ageInput.value);
      if (!Number.isInteger(age) || age <= 0) {
        alert("나이는 0보다 큰 정수만 입력할 수 있습니다.");
        return;
      }
    }
    const genderValue =
      genderDropdown.querySelector(".dropdown-selected").dataset.value || "";
    const roleValue =
      roleDropdown.querySelector(".dropdown-selected").dataset.value || "";

    const filteredMembersData = membersData.filter((member) => {
      return (
        (nameInput.value === "" || member.name.includes(nameInput.value)) &&
        (englishNameInput.value === "" ||
          member.englishName.includes(englishNameInput.value)) &&
        (githubInput.value === "" ||
          member.github.includes(githubInput.value)) &&
        (genderValue === "" || member.gender === genderValue) &&
        (roleValue === "" || member.role === roleValue) &&
        (codeReviewGroupInput.value === "" ||
          member.codeReviewGroup === Number(codeReviewGroupInput.value)) &&
        (ageInput.value === "" || member.age === Number(ageInput.value))
      );
    });

    renderResultTable(filteredMembersData);
  });

  resetBtn.addEventListener("click", () => {
    searchInputs.forEach((input) => (input.value = ""));

    document.querySelectorAll(".dropdown-selected").forEach((selectedItem) => {
      selectedItem.dataset.value = "";
      selectedItem.textContent = selectedItem.classList.contains("gender")
        ? "성별"
        : "역할";
    });

    renderResultTable(getMembersData());
  });
}
