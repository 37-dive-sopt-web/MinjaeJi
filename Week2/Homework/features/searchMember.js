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
