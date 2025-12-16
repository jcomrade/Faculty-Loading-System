import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import { TiExport } from "react-icons/ti";
import { FaRegFileAlt } from "react-icons/fa";
import { FaRegFile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as XLSX from "xlsx";

const Export = () => {
  const navigate = useNavigate();
  const [semData, setSemData] = useState(null);
  const [userData, setUserData] = useState({});
  const params = useParams();

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch("http://localhost:4000/api/auth/user", {
          method: "GET",
          credentials: "include",
        });
        const user = await res.json();
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const res = await fetch("http://localhost:4000/api/semester", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setSemData(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
  const formatSection = (section, courseType, bloc) => {
    console.log(section, courseType, bloc);
    if (courseType === "LAB") {
      return `${section}-${bloc}L`;
    }
    return section;
  };

  const handleExportClick = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/semester/${id}/`, {
        method: "GET",
        credentials: "include",
      });
      const { schedules } = await res.json();

      const headers = [
        "Course Code",
        "Course Description",
        "Class",
        "Section",
        "Time",
        "Day",
        "Rm",
        "Units",
        "Students",
        "FIC",
        "Remarks",
      ];

      const data = schedules.map((schedule) => ({
        "Course Code": schedule.course?.code || "N/A",
        "Course Description": schedule.course?.name || "N/A",
        Class: schedule.course?.type || "N/A",
        Section: schedule.schedule
          .map(({ section }) =>
            formatSection(
              section,
              schedule.course?.type,
              schedule.schedule[0]?.bloc || "1"
            )
          )
          .join(),
        Time: schedule.schedule
          .map(
            (time) => `${time.startTime || "N/A"} - ${time.endTime || "N/A"}`
          )
          .join(", "),
        Day: schedule.schedule
          .map((time) => time.day?.join(", ") || "N/A")
          .join(", "),
        Rm:
          schedule.room && (schedule.room.building || schedule.room.name)
            ? `${schedule.room.building || ""} ${
                schedule.room.name || ""
              }`.trim()
            : "N/A",
        Units: schedule.course?.units || "N/A",
        Students: (schedule.students || [])
          .map(
            (student) =>
              `${student.yearLevel || ""}${student.name || ""}${
                student.bloc ? " Bloc " + student.bloc : ""
              }`.trim() || "N/A"
          )
          .join(", "),
        FIC:
          `${schedule.faculty?.firstName || ""} ${
            schedule.faculty?.lastName || ""
          }`.trim() || "N/A",
        Remarks: schedule.remarks || "N/A",
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);

      XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: "A1" });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Semester Data");

      const timeSlots = [
        "7:00-8:30",
        "8:30-10:00",
        "10:00-11:30",
        "11:30-1:00",
        "1:00-2:30",
        "2:30-4:00",
        "4:00-5:30",
        "5:30-7:00",
      ];

      const findSlotIndex = (startTime) => {
        if (!startTime) return -1;
        const normalized = startTime.replace(/\s/g, "");
        return timeSlots.findIndex((s) => s.startsWith(normalized) || s.includes(normalized));
      };

      const parseDays = (dayVal) => {
        if (!dayVal) return [];
        if (Array.isArray(dayVal)) return dayVal.map(d => d.toString());
        let s = dayVal.toString().trim();
        if (!s) return [];
        s = s.replace(/TTh/gi, 'T,Th');
        s = s.replace(/T\/Th/gi, 'T,Th');
        const parts = s.split(/[,/\s]+/).filter(Boolean);
        const out = [];
        parts.forEach((tok) => {
          const t = tok.toLowerCase();
          if (t === 'm' || t.startsWith('m')) out.push('M');
          else if (t === 'th' || t === 'r') out.push('Th'); 
          else if (t === 't' || t === 'tu' || t === 'tue') out.push('T');
          else if (t === 'w' || t.startsWith('w')) out.push('W');
          else if (t === 'f' || t.startsWith('f')) out.push('F');
          else {
            if (tok.toUpperCase().includes('M')) out.push('M');
            if (/T(?!H)/i.test(tok)) out.push('T');
            if (/TH/i.test(tok)) out.push('Th');
            if (tok.toUpperCase().includes('W')) out.push('W');
            if (tok.toUpperCase().includes('F')) out.push('F');
          }
        });
        return Array.from(new Set(out));
      };

      const facultyMap = {};
      schedules.forEach((item) => {
        const facultyName = `${item.faculty?.firstName || ""} ${item.faculty?.lastName || ""}`.trim() || "Unassigned";
        if (!facultyMap[facultyName]) facultyMap[facultyName] = [];
        facultyMap[facultyName].push({ course: item.course?.code || "N/A", schedule: item.schedule || [] });
      });

      let facultyAoA = [];

      Object.keys(facultyMap).forEach((faculty) => {
  facultyAoA.push([`Faculty: ${faculty}`]);
  facultyAoA.push(["", "Time Slot", "M", "T", "W", "Th", "F"]);

        const grid = timeSlots.map((slot) => ["", slot, "", "", "", "", ""]);

        facultyMap[faculty].forEach((entry) => {
          const courseCode = entry.course;
          entry.schedule.forEach((s) => {
            const days = Array.isArray(s.day) ? s.day : parseDays(s.day);
            const slotIdx = findSlotIndex(s.startTime);
            let rowIdx = slotIdx;
            if (rowIdx === -1) {
              rowIdx = timeSlots.findIndex((t) => (s.startTime && t.includes(s.startTime)) || (s.startTime && s.startTime.includes(t.split("-")[0])) );
            }

            if (rowIdx === -1) return;

            days.forEach((d) => {
              const day = (d || "").toString().toLowerCase();
              let col = -1;
              if (day.startsWith("m")) col = 2;
              else if (day.startsWith("t") && day.length === 1) col = 3; 
              else if (day.startsWith("w")) col = 4;
              else if (day.toLowerCase().includes("th")) col = 5;
              else if (day.startsWith("f")) col = 6;

              if (col !== -1) {
                grid[rowIdx][col] = courseCode;
              }
            });
          });
        });

        grid.forEach((r) => facultyAoA.push(r));
        facultyAoA.push([]);
      });

      const facultySheet = XLSX.utils.aoa_to_sheet(facultyAoA);
      XLSX.utils.book_append_sheet(workbook, facultySheet, "Faculty Timetable");

      let tabularAoA = [];
      Object.keys(facultyMap).forEach((faculty) => {
        tabularAoA.push([`Faculty: ${faculty}`]);
        tabularAoA.push(headers);

        const facSchedules = schedules.filter((sch) => {
          const fname = `${sch.faculty?.firstName || ""} ${sch.faculty?.lastName || ""}`.trim() || "Unassigned";
          return fname === faculty;
        });

        let totalUnits = 0;
        facSchedules.forEach((schedule) => {
          const row = [
            schedule.course?.code || "N/A",
            schedule.course?.name || "N/A",
            schedule.course?.type || "N/A",
            schedule.schedule
              .map(({ section }) =>
                formatSection(
                  section,
                  schedule.course?.type,
                  schedule.schedule[0]?.bloc || "1"
                )
              )
              .join(),
            schedule.schedule
              .map((time) => `${time.startTime || "N/A"} - ${time.endTime || "N/A"}`)
              .join(", "),
            schedule.schedule.map((time) => (Array.isArray(time.day) ? time.day.join(", ") : time.day)).join(", ") || "N/A",
            schedule.room && (schedule.room.building || schedule.room.name)
              ? `${schedule.room.building || ""} ${schedule.room.name || ""}`.trim()
              : "N/A",
            schedule.course?.units || 0,
            (schedule.students || [])
              .map(
                (student) =>
                  `${student.yearLevel || ""}${student.name || ""}${
                    student.bloc ? " Bloc " + student.bloc : ""
                  }`.trim() || "N/A"
              )
              .join(", "),
            `${schedule.faculty?.firstName || ""} ${schedule.faculty?.lastName || ""}`.trim() || "N/A",
            schedule.remarks || "N/A",
          ];

          totalUnits += Number(schedule.course?.units || 0);
          tabularAoA.push(row);
        });

        tabularAoA.push([]);
        tabularAoA.push(["", "", "", "", "", "", "", "TLC/Teaching Load", totalUnits]);
        tabularAoA.push(["", "", "", "", "", "", "", "TOTAL UNITS", totalUnits]);
        tabularAoA.push([]);
      });

      const tabularSheet = XLSX.utils.aoa_to_sheet(tabularAoA);
      XLSX.utils.book_append_sheet(workbook, tabularSheet, "Tabular Faculty Schedule");

      XLSX.writeFile(workbook, "Semester_Data.xlsx");
    } catch (error) {
      console.error("Error exporting data:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavBar />
      <div className="flex flex-row justify-center space-x-4 py-7">
        {userData.userType && (
          <>
            <button
              className="flex items-center font-semibold justify-center text-xl border-enamelled-jewel bg-placebo-turquoise text-enamelled-jewel w-32 h-11 transition ease-in duration-200 hover:shadow-custom"
              onClick={() => {
                if (semData?.length) handleExportClick(semData[0]._id);
              }}
            >
              <TiExport /> Export
            </button>
          </>
        )}
      </div>

      <div className="mx-auto w-5/6">
        <table className="w-full border-b">
          <thead className="border-b-2 border-black text-left">
            <tr>
              <th className="flex font-bold text-2xl items-center text-black p-2">
                <FaRegFile />
                Name
              </th>
              <th className="text-black font-bold text-2xl p-2">Type</th>
            </tr>
          </thead>
          <tbody>
            {semData ? (
              semData.map((sem) => (
                <tr
                  className="border-b cursor-pointer"
                  key={sem._id}
                  onMouseDown={() => handleExportClick(sem._id)}
                >
                  <td className="flex text-xl font-semibold flex-row items-center text-black p-2">
                    <FaRegFileAlt />
                    {sem.semesterType} Semester {sem.AY}
                  </td>
                  <td className="text-black text-xl font-semibold p-2">
                    <div className="flex flex-col">
                      <p>Summary</p>
                      <p>Faculty</p>
                      <p>Bloc</p>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-enamelled-jewel text-2xl text-center font-bold p-2"
                >
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Export;
