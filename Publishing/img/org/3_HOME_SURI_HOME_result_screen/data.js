window.HOME_SURI_DATA = {
  diagnosisResult: {
    issueTitle: "현관문 도어클로저 누유 감지",
    confidence: 95,
    summary: [
      { icon: "gauge", label: "난이도", value: "보통" },
      { icon: "clock", label: "소요 시간", value: "30분" },
      { icon: "wallet", label: "예상 비용", value: "₩25,000" }
    ],
    cautions: [
      "내부 압력 유체로 인해 기름이 튈 수 있으니 작업 전 바닥에 신문지를 깔아주세요.",
      "문이 갑자기 닫힐 수 있으므로 도어스토퍼를 고정해 주세요."
    ],
    requiredTools: [
      { icon: "wrench", label: "십자 드라이버" },
      { icon: "compass", label: "육각 렌치" },
      { icon: "hammer", label: "교체용 암 (Arm)" },
      { icon: "brush-cleaning", label: "청소용 티슈" }
    ],
    part: {
      image: "../../img/2_002.png",
      badge: "피스 규격",
      name: "M5 x 15mm",
      description: "십자 머리 태핑 나사",
      note: "표준 현관문 고정용"
    },
    steps: [
      {
        id: "step_01",
        image: "../../img/3_002.png",
        title: "기존 본체 탈거",
        description:
          "상단의 암(Arm) 연결부를 먼저 분리한 뒤, 본체를 고정하고 있는 4개의 피스를 순서대로 풀어줍니다."
      },
      {
        id: "step_02",
        image: "../../img/4_002.png",
        title: "새 본체 장착 및 조절",
        description:
          "새 제품을 기존 구멍에 맞춰 밀착시킨 후 피스를 가고정합니다. 모든 피스가 위치를 잡으면 단단히 조여줍니다."
      }
    ],
    checklist: [
      "본체가 수평으로 장착되었나요?",
      "기름 누출 부위가 깨끗이 닦였나요?",
      "문이 부드럽게 닫히는지 확인했나요?"
    ]
  }
};
