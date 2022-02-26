const {saveEvidence, EVIDENCE_NONE, EVIDENCE_EMF5, EVIDENCE_ORB, EVIDENCE_DOTS, EVIDENCE_FINGERPRINTS, guessGhost,
  EVIDENCE_SPIRIT_BOX, guessGhostEmbed
} = require("./ghost");

describe("ghost saving", () => {
  test("save single evidence", () => {
    const res = saveEvidence(EVIDENCE_NONE, EVIDENCE_EMF5)
    expect(res).toBe(`O ${EVIDENCE_EMF5}\n`)
  })

  test("save same evidence twice", () => {
    const res1 = saveEvidence(EVIDENCE_NONE, EVIDENCE_EMF5)
    const res2 = saveEvidence(res1, EVIDENCE_EMF5)
    expect(res2).toBe(`X ${EVIDENCE_EMF5}\n`)
  })

  test("save same evidence thrice", () => {
    const res1 = saveEvidence(EVIDENCE_NONE, EVIDENCE_EMF5)
    const res2 = saveEvidence(res1, EVIDENCE_EMF5)
    const res3 = saveEvidence(res2, EVIDENCE_EMF5)
    expect(res3).toBe(EVIDENCE_NONE)
  })

  test("complex evidence scenario", () => {
    const res1 = saveEvidence(EVIDENCE_NONE, EVIDENCE_EMF5)
    const res2 = saveEvidence(res1, EVIDENCE_ORB)
    const res3 = saveEvidence(res2, EVIDENCE_EMF5)
    const res4 = saveEvidence(res3, EVIDENCE_DOTS)
    const res5 = saveEvidence(res4, EVIDENCE_FINGERPRINTS)
    const res6 = saveEvidence(res5, EVIDENCE_DOTS)
    const res7 = saveEvidence(res6, EVIDENCE_EMF5)

    expect(res7).toBe(`O ${EVIDENCE_ORB}\nX ${EVIDENCE_DOTS}\nO ${EVIDENCE_FINGERPRINTS}\n`)
  })
})


describe("ghost guessing", () => {
  test("EMF5 and Orb", () => {
    const evidences = new Map()
    evidences.set(EVIDENCE_EMF5, true)
    evidences.set(EVIDENCE_SPIRIT_BOX, true)
    console.log(guessGhost(evidences))
  })
})
