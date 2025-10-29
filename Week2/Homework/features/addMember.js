import { getMembersData, setMembersData } from "./storage.js";

export function handleAddMember(renderResultTable) {
  const modal = document.getElementById("modal");
  const addBtn = document.getElementById("add-btn");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  // 모달 열기
  addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  // 모달 닫기
  const closeModal = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
    document.querySelectorAll("#modal input").forEach((i) => (i.value = ""));
  };

  cancelBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // 저장
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

    const membersData = getMembersData();
    membersData.push(newMember);
    setMembersData(membersData);
    renderResultTable(membersData);
    closeModal();
  });
}
