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
      role: document.getElementById("newMemberRole").value,
      codeReviewGroup: document.getElementById("newMemberGroup").value,
      age: document.getElementById("newMemberAge").value,
    };

    const values = Object.values(newMember);
    if (values.some((value) => value === "")) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    if (!/^[A-Za-z]+$/.test(newMember.englishName)) {
      alert("영문 이름은 영어 알파벳만 입력 가능합니다.");
      return;
    }

    if (!/^[A-Za-z]+$/.test(newMember.github)) {
      alert("깃허브 아이디는 영어 알파벳만 입력 가능합니다.");
      return;
    }

    const group = Number(newMember.codeReviewGroup);
    if (!Number.isInteger(group) || group < 1 || group > 9) {
      alert("금잔디 조는 1부터 9 사이의 정수만 입력 가능합니다.");
      return;
    }
    newMember.codeReviewGroup = group;

    const age = Number(newMember.age);
    if (!Number.isInteger(age) || age <= 0) {
      alert("나이는 0보다 큰 정수만 입력 가능합니다.");
      return;
    }
    newMember.age = age;

    membersData.push(newMember);
    setMembersData(membersData);
    renderResultTable(membersData);
    handleCloseModal();
  });
}
