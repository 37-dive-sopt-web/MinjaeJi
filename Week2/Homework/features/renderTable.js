export function renderResultTable(membersData) {
  const tableBody = document.querySelector("#membersTable tbody");
  tableBody.innerHTML = "";

  if (membersData.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="justify-contents: center">검색 결과가 없습니다.</td></tr>`;
    return;
  }

  membersData.forEach((member) => {
    const memberItem = `
      <tr>
        <td><input type="checkbox" data-id="${member.id}" /></td>
        <td>${member.name}</td>
        <td>${member.englishName}</td>
        <td><a href="https://github.com/${member.github}" target="_blank" rel="noopener norefferer">${member.github}</a></td>
        <td>${member.gender}</td>
        <td>${member.role}</td>
        <td>${member.codeReviewGroup}</td>
        <td>${member.age}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML("beforeend", memberItem);
  });
}
