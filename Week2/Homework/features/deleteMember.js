import { getMembersData, setMembersData } from "./storage.js";

export function handleDeleteMember(renderResultTable) {
  const deleteBtn = document.getElementById("deleteBtn");
  const selectAll = document.getElementById("selectAll");
  const tbody = document.querySelector("#membersTable tbody");

  // 전체 선택/해제
  selectAll.addEventListener("change", (e) => {
    tbody
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => (checkbox.checked = e.target.checked));
  });

  // 개별 체크박스 클릭 추적 (이벤트 위임)
  tbody.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      const memberCheckBoxes = tbody.querySelectorAll('input[type="checkbox"]');
      selectAll.checked = Array.from(memberCheckBoxes).every(
        (checkbox) => checkbox.checked
      );
    }
  });

  deleteBtn.addEventListener("click", () => {
    const membersData = getMembersData();
    const selected = document.querySelectorAll(
      '#membersTable tbody input[type="checkbox"]:checked'
    );

    if (selected.length === 0) {
      alert("삭제할 멤버를 선택하세요.");
      return;
    }

    if (!confirm("정말 삭제하시겠습니까?")) {
      selected.forEach((checkbox) => (checkbox.checked = false));
      selectAll.checked = false;
      return;
    }

    const selectedMemberIds = Array.from(selected).map((checkbox) =>
      Number(checkbox.dataset.id)
    );

    const updatedMembersData = membersData.filter(
      (member) => !selectedMemberIds.includes(member.id)
    );

    setMembersData(updatedMembersData);
    renderResultTable(updatedMembersData);
    selectAll.checked = false;
  });
}
