import { getMembersData } from "./storage.js";

export function handleSearchMember(renderResultTable) {
  const searchInputs = document.querySelectorAll(
    ".filter-section input, .filter-section select"
  );
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");

  searchBtn.addEventListener("click", () => {
    const [
      nameInput,
      englishNameInput,
      githubInput,
      genderSelect,
      roleSelect,
      codeReviewGroupInput,
      ageInput,
    ] = searchInputs;
    const membersData = getMembersData();

    if (englishNameInput.value && !/^[A-Za-z]+$/.test(englishNameInput.value)) {
      alert("영문 이름은 영어만 입력할 수 있습니다.");
      return;
    }

    if (
      codeReviewGroupInput &&
      (!/^[1-9]+$/.test(codeReviewGroupInput.value) ||
        Number(codeReviewGroupInput.value) < 1 ||
        Number(codeReviewGroupInput.value) > 9)
    ) {
      alert("금잔디 조는 1부터 9 사이의 정수만 입력 가능합니다.");
      return;
    }

    if (
      ageInput &&
      (!/^\d+$/.test(ageInput.value) || Number(ageInput.value) <= 0)
    ) {
      alert("나이는 0보다 큰 정수만 입력할 수 있습니다.");
      return;
    }

    const filteredMembersData = membersData.filter((member) => {
      return (
        (nameInput.value === "" || member.name.includes(nameInput.value)) &&
        (englishNameInput.value === "" ||
          member.englishName.includes(englishNameInput.value)) &&
        (githubInput.value === "" ||
          member.github.includes(githubInput.value)) &&
        (genderSelect.value === "" || member.gender === genderSelect.value) &&
        (roleSelect.value === "" || member.role === roleSelect.value) &&
        (codeReviewGroupInput.value === "" ||
          member.codeReviewGroup === Number(codeReviewGroupInput.value)) &&
        (ageInput.value === "" || member.age === Number(ageInput.value))
      );
    });

    renderResultTable(filteredMembersData);
  });

  resetBtn.addEventListener("click", () => {
    searchInputs.forEach((input) => (input.value = ""));
    renderResultTable(getMembersData());
  });
}
