const tableBody = document.querySelector("#members-table tbody");
const searchInputs = document.querySelectorAll(
  ".filter-section input, .filter-section select"
);
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");

document.addEventListener("DOMContentLoaded", renderResultTable(membersData));

function renderResultTable(membersData) {
  if (membersData.length === 0) {
    tableBody.innerHTML = `<tr><td>검색 결과가 없습니다.</td></tr>`;
    return;
  }

  membersData.forEach((member) => {
    const memberItem = `
        <tr>
          <td><input type="checkbox" data-id="${member.id}" /></td>
          <td>${member.name}</td>
          <td>${member.englishName}</td>
          <td><a href="https://github.com/${member.github}" target="_blank">${member.github}</a></td>
          <td>${member.gender}</td>
          <td>${member.role}</td>
          <td>${member.codeReviewGroup}</td>
          <td>${member.age}</td>
        </tr>
      `;
    tableBody.insertAdjacentHTML("beforeend", memberItem);
  });
}

const membersData = JSON.parse(localStorage.getItem("membersData")) || [];
renderResultTable(membersData);
