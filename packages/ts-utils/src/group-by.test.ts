import { describe, it, expect } from "vitest";
import { groupBy, groupByAdapter, multipleGroupBy, multipleGroupByAdapter } from "./group-by.js";

type User = { id: number; role: string; team: string };

const users: User[] = [
  { id: 1, role: "admin", team: "alpha" },
  { id: 2, role: "user", team: "alpha" },
  { id: 3, role: "user", team: "beta" },
  { id: 4, role: "admin", team: "beta" },
];

describe("groupBy", () => {
  it("groups by a single key", () => {
    const result = groupBy(users, "role");
    expect(Object.keys(result).sort()).toEqual(["admin", "user"]);
    expect(result["admin"]).toHaveLength(2);
    expect(result["user"]).toHaveLength(2);
  });
});

describe("groupByAdapter", () => {
  it("returns {key, count, data} shape", () => {
    const adapted = groupByAdapter(groupBy(users, "role"));
    expect(adapted).toHaveLength(2);
    expect(adapted.find((g) => g.key === "admin")?.count).toBe(2);
  });
});

describe("multipleGroupBy", () => {
  it("returns data unchanged for empty keys", () => {
    expect(multipleGroupBy(users, [])).toEqual(users);
  });

  it("nests by multiple keys", () => {
    const result = multipleGroupBy(users, ["role", "team"]) as Record<
      string,
      Record<string, User[]>
    >;
    expect(result["admin"]?.["alpha"]).toHaveLength(1);
    expect(result["admin"]?.["beta"]).toHaveLength(1);
    expect(result["user"]?.["alpha"]).toHaveLength(1);
  });
});

describe("multipleGroupByAdapter", () => {
  it("returns empty array for flat data input", () => {
    expect(multipleGroupByAdapter(users)).toEqual([]);
  });

  it("recursively adapts nested groups", () => {
    const nested = multipleGroupBy(users, ["role", "team"]);
    const adapted = multipleGroupByAdapter(nested);
    expect(adapted).toHaveLength(2);
    const admin = adapted.find((g) => g.key === "admin");
    expect(admin?.count).toBe(2);
    expect(Array.isArray(admin?.data)).toBe(true);
  });
});
