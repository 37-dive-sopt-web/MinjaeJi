import { getMembersData } from "./storage.js";

export function handleSearchMember(renderResultTable) {
  const searchInputs = document.querySelectorAll(
    ".filter-section input, .filter-section select"
  );
  const searchBtn = document.getElementById("search-btn");
  const resetBtn = document.getElementById("reset-btn");

  searchBtn.addEventListener("click", () => {
    const [name, eng, github, gender, role, group, age] = searchInputs;
    const membersData = getMembersData();

    const filtered = membersData.filter((member) => {
      return (
        (name.value === "" || member.name.includes(name.value)) &&
        (eng.value === "" || member.englishName.includes(eng.value)) &&
        (github.value === "" || member.github.includes(github.value)) &&
        (gender.value === "" || member.gender === gender.value) &&
        (role.value === "" || member.role === role.value) &&
        (group.value === "" ||
          member.codeReviewGroup === Number(group.value)) &&
        (age.value === "" || member.age === Number(age.value))
      );
    });

    renderResultTable(filtered);
  });

  resetBtn.addEventListener("click", () => {
    searchInputs.forEach((input) => (input.value = ""));
    renderResultTable(getMembersData());
  });
}
