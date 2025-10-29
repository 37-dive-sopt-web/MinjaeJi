import { getMembersData, setMembersData } from "./storage.js";

export function handleAddMember(renderResultTable) {
  const modal = document.getElementById("modal");
  const addBtn = document.getElementById("addBtn");
  const saveBtn = document.getElementById("saveBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  const handleCloseModal = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
    document.querySelectorAll("#modal input").forEach((i) => (i.value = ""));
  };

  cancelBtn.addEventListener("click", handleCloseModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) handleCloseModal();
  });

  const membersData = getMembersData();
  const maxMemberId =
    membersData.length > 0
      ? Math.max(...membersData.map((member) => member.id))
      : 0;

  saveBtn.addEventListener("click", () => {
    const newMember = {
      id: maxMemberId + 1,
      name: document.getElementById("newMemberName").value,
      englishName: document.getElementById("newMemberEnglishName").value,
      github: document.getElementById("newMemberGithub").value,
      gender: document.getElementById("newMemberGender").value,
      gender: document.getElementById("newMemberRole").value,
      codeReviewGroup: Number(document.getElementById("newMemberGroup").value),
      age: Number(document.getElementById("newMemberAge").value),
    };

    membersData.push(newMember);
    setMembersData(membersData);
    renderResultTable(membersData);
    handleCloseModal();
  });
}
