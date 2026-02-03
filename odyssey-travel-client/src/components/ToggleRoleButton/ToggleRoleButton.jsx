import React from 'react'

function ToggleRoleButton({ role, setRole }) {
  console.log("ToggleRoleButton current role:", role);
  return (
    <div className="flex justify-center mb-10">
      <div className="relative bg-amber-200 rounded-full w-80 h-12 flex">
        <div
          className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-amber-400 shadow transition-all duration-300 ${role === "CLIENT" ? "left-1" : "left-[50%]"
            }`}
        />

        {[
          { value: "CLIENT", label: "Customer" },
          { value: "AGENT", label: "Agent" }
        ].map((r) => (
          <button
            key={r.value}
            type="button"
            onClick={() => {
              console.log("Setting role to:", r.value);
              setRole(r.value);
            }}
            className={`w-1/2 z-10 font-semibold transition ${role === r.value ? "text-red-600" : "text-gray-600"
              }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ToggleRoleButton