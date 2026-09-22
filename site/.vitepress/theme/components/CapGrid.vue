<script setup lang="ts">
const caps = [
  {
    name: "network",
    icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z"/>',
    blurb: "Outbound domains and how they are reached.",
    example: "curl → evil.example.com",
  },
  {
    name: "exec",
    icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9l3 3-3 3M13 15h4"/>',
    blurb: "Shell access and interpreters a skill can invoke.",
    example: "shell: true · bash, python3",
  },
  {
    name: "filesystem",
    icon: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    blurb: "Paths a skill reads and where it may write.",
    example: "reads ~/** · writes ./reports/**",
  },
  {
    name: "secrets",
    icon: '<rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
    blurb: "Environment variables and credentials in reach.",
    example: "GITHUB_TOKEN, AWS_SECRET…",
  },
  {
    name: "agents",
    icon: '<circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M3 20c0-3 2.5-5 5-5s5 2 5 5M11 20c0-3 2.5-5 5-5s5 2 5 5"/>',
    blurb: "Whether a skill spawns subagents, and which kinds.",
    example: "spawns research agents",
  },
  {
    name: "mcp",
    icon: '<path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 0 1-10 0zM12 17v4"/>',
    blurb: "MCP servers a skill connects to.",
    example: "servers: []",
  },
];
</script>

<template>
  <div class="sp-capgrid">
    <div v-for="(cap, i) in caps" :key="cap.name" class="sp-cap" data-reveal="scale" :style="{ '--reveal-delay': `${(i % 3) * 70}ms` }">
      <div class="sp-cap-head">
        <span class="sp-cap-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-html="cap.icon"
          />
        </span>
        <code>{{ cap.name }}</code>
      </div>
      <p>{{ cap.blurb }}<br /><code>{{ cap.example }}</code></p>
    </div>
  </div>
</template>
