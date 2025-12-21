import { ref, get, query, limitToFirst } from "firebase/database";
import { db } from "./firebase";
import { Teacher } from "@/types/teacher";

export async function getTeachers(
  limit = 4
): Promise<(Teacher & { id: string })[]> {
  console.log("🔵 Fetching teachers...");

  // Змінили "teachers" на "/" - тому що дані в корені
  const teachersRef = query(ref(db, "/"), limitToFirst(limit));

  try {
    const snapshot = await get(teachersRef);

    console.log("🔵 Snapshot exists:", snapshot.exists());
    console.log("🔵 Snapshot value:", snapshot.val());

    if (!snapshot.exists()) {
      console.log("❌ No data in database");
      return [];
    }

    const data = snapshot.val();

    // Дані у вас як масив
    if (Array.isArray(data)) {
      console.log("✅ Data is array, length:", data.length);
      return data
        .filter(Boolean) // Видаляємо null/undefined
        .slice(0, limit) // Обмежуємо кількість
        .map((teacher, index) => ({
          id: index.toString(),
          ...teacher,
        }));
    } else {
      console.log("✅ Data is object");
      return Object.entries(data)
        .slice(0, limit)
        .map(([id, teacher]: any) => ({
          id,
          ...teacher,
        }));
    }
  } catch (error) {
    console.error("❌ Error fetching teachers:", error);
    return [];
  }
}
