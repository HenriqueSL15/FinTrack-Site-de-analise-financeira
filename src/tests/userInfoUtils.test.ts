import getUserInformation from "../utils/userInfoUtils";

describe("getUserInformation", () => {
  it("should return user information", async () => {
    const userId = 11;
    const userInformation = await getUserInformation(userId);
    expect(userInformation).toBeDefined();
  });
});
