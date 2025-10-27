document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#members-table tbody");
  const searchInputs = document.querySelectorAll(
    ".filter-section input, .filter-section select"
  );
  const searchBtn = document.getElementById("searchBtn");
  const resetBtn = document.getElementById("resetBtn");

  function renderResultTable(membersData) {
    tableBody.innerHTML = ""; // 이전 결과 초기화
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

  searchBtn.addEventListener("click", () => {
    const [
      nameInput,
      engInput,
      githubInput,
      genderSelect,
      roleSelect,
      groupInput,
      ageInput,
    ] = document.querySelectorAll(
      ".filter-section input, .filter-section select"
    );
    const filteredResult = membersData.filter((member) => {
      return (
        (nameInput.value === "" || member.name.includes(nameInput.value)) &&
        (engInput.value === "" ||
          member.englishName.includes(engInput.value)) &&
        (githubInput.value === "" ||
          member.github.includes(githubInput.value)) &&
        (genderSelect.value === "" ||
          member.gender.includes(genderSelect.value)) &&
        (roleSelect.value === "" || member.role.includes(roleSelect.value)) &&
        (groupInput.value === "" ||
          member.codeReviewGroup === Number(groupInput.value)) &&
        (ageInput.value === "" || member.age === Number(ageInput.value))
      );
    });
    renderResultTable(filteredResult);
  });
  resetBtn.addEventListener("click", () => {
    searchInputs.forEach((input) => (input.value = ""));
    renderResultTable(membersData);
  });

  const addBtn = document.getElementById("addBtn");
  const modal = document.getElementById("modal");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  // 모달 열기
  addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  // 모달 닫기
  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  });

  // 저장 버튼 클릭 시
  saveBtn.addEventListener("click", () => {
    const newMember = {
      name: document.getElementById("modalName").value,
      englishName: document.getElementById("modalEnglishName").value,
      github: document.getElementById("modalGithub").value,
      gender: document.getElementById("modalGender").value,
      role: document.getElementById("modalRole").value,
      codeReviewGroup: Number(document.getElementById("modalGroup").value),
      age: Number(document.getElementById("modalAge").value),
    };

    // 기존 데이터 가져오기
    const membersData = JSON.parse(localStorage.getItem("membersData")) || [];
    membersData.push(newMember);

    // localStorage 업데이트
    localStorage.setItem("membersData", JSON.stringify(membersData));

    // 테이블 다시 렌더링
    tableBody.innerHTML = "";
    renderResultTable(membersData);

    // 모달 닫기
    modal.classList.add("hidden");

    // 입력값 초기화
    document
      .querySelectorAll("#modal input")
      .forEach((input) => (input.value = ""));
  });
});
