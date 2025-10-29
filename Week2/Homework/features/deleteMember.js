import { getMembersData, setMembersData } from "./storage.js";

export function handleDeleteMember(renderResultTable) {
  const deleteBtn = document.getElementById("deleteBtn");
  const selectAll = document.getElementById("selectAll");

  selectAll.addEventListener("change", (e) => {
    document
      .querySelectorAll('#membersTable tbody input[type="checkbox"]')
      .forEach((cb) => (cb.checked = e.target.checked));
  });

  deleteBtn.addEventListener("click", () => {
    const membersData = getMembersData();
    const selected = document.querySelectorAll(
      '#membersTable tbody input[type="checkbox"]:checked'
    );

    if (selected.length === 0) {
      alert("삭제할 멤버를 선택하세요!");
      return;
    }

    if (!confirm("정말 삭제하시겠습니까?")) {
      selected.forEach((cb) => (cb.checked = false));
      selectAll.checked = false;
      return;
    }

    const selectedIds = Array.from(selected).map((cb) => Number(cb.dataset.id));
    const updated = membersData.filter((m) => !selectedIds.includes(m.id));

    setMembersData(updated);
    renderResultTable(updated);
    selectAll.checked = false;
  });
}
