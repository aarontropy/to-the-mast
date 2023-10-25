import Day from "./Day";
import Intent from "./Intent";

describe("Intent Domain Model", () => {
  it("creates with defaults", () => {
    const today = Day.today().value;
    const intent = Intent.createNew("abc");
    const dto = intent.asDTO();

    expect(dto).toEqual({
      domainEvents: [],
      userId: "abc",
      id: dto.id,
      activeState: "paused",
      bigThing: { text: "a big thing" },
      smallThing: { text: "a small thing" },
      schedule: { kind: "daily", startDate: { value: today }, endDate: null },
      touchpoints: { recommit: { when: "morning" }, checkin: { when: "evening" } },
      communicationSlots: {
        morning: { localHour: 7 },
        afternoon: { localHour: 13 },
        evening: { localHour: 19 },
      },
    });
  });
});
