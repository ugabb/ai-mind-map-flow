import convertJsonToReactFlow from "./convertJsonToReactFlow";

// Test with the example JSON
const testJson = {
  "Sedentary Lifestyle: The Silent Killer": {
    "1. Sitting Epidemic": {
      Statistics:
        "- People sit 9.3 hours a day, more than they sleep.\n- Sitting has become normalized in society, leading to health risks.",
    },
    "2. Health Consequences": {
      "Direct Links to Diseases":
        "- **Breast Cancer**: 10% risk increase.\n- **Colon Cancer**: 10% risk increase.\n- **Heart Disease**: 6% risk increase.\n- **Type 2 Diabetes**: 7% risk increase.",
    },
    "3. Personal Experience": {
      "Walking Meetings":
        "- Transformed the speaker's life, averaging 20 to 30 miles weekly.\n- Fosters out-of-the-box thinking and problem-solving.\n- Advocates reframing issues to find innovative solutions.",
    },
  },
};

const [nodes, edges] = convertJsonToReactFlow(testJson);

console.log("Generated Nodes:");
nodes.forEach((node, index) => {
  console.log(`${index + 1}. ${node.id}: ${node.data.label}`);
});

console.log("\nGenerated Edges:");
edges.forEach((edge, index) => {
  console.log(`${index + 1}. ${edge.source} -> ${edge.target}`);
});

console.log(`\nTotal Nodes: ${nodes.length}`);
console.log(`Total Edges: ${edges.length}`);
