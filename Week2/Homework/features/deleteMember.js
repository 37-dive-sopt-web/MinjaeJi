import { getMembersData, setMembersData } from "./storage.js";

export function handleDeleteMember(renderResultTable) {
  const deleteBtn = document.getElementById("deleteBtn");
  const selectAll = document.getElementById("selectAll");
  const memberCheckBoxes = document.querySelectorAll(
    '#membersTable tbody input[type="checkbox"]'
  );

  // 전체 선택/해제
  selectAll.addEventListener("change", (e) => {
    memberCheckBoxes.forEach(
      (checkbox) => (checkbox.checked = e.target.checked)
    );
  });

  // 개별 선택/해제 추적 -> 전체 선택 값에 반영
  memberCheckBoxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      selectAll.checked = Array.from(memberCheckBoxes).every(
        (checkbox) => checkbox.checked
      );
    });
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
