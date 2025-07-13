// HTML Element References(connect HTML elem with JS)
const campaignContainer = document.getElementById("campaignContainer");
const platformFilter = document.getElementById("platformFilter");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

let campaigns=[];

function displayCampaigns(data) {
  campaignContainer.innerHTML = "";
  if (data.length === 0) {
    campaignContainer.innerHTML = `<p>No campaigns found</p>`;
    return;
  }

  data.forEach(campaign => {
    const ctr = campaign.impressions === 0 ? "0.00" : ((campaign.clicks / campaign.impressions) * 100).toFixed(2);

    const card = document.createElement("div");
    card.className = "campaign-card";
    card.innerHTML = `
      <h3>${campaign.name}</h3>
      <p><strong>Platform:</strong> ${campaign.platform}</p>
      <p><strong>Status:</strong> ${campaign.status}</p>
      <p><strong>Impressions:</strong> ${campaign.impressions.toLocaleString()}</p>
      <p><strong>Clicks:</strong> ${campaign.clicks}</p>
      <p><strong>Spend:</strong> ₹${campaign.spend.toLocaleString()}</p>
      <p><strong>CTR:</strong> ${ctr}%</p>
    `;
    campaignContainer.appendChild(card);
  });
}

function applyFilters() {
  const platformValue = platformFilter.value;
  const statusValue = statusFilter.value;
  const searchValue = searchInput.value.toLowerCase();

  const filtered = campaigns.filter(campaign => {
    const matchesPlatform = platformValue === "All" || campaign.platform === platformValue;
    const matchesStatus = statusValue === "All" || campaign.status === statusValue;
    const matchesSearch = campaign.name.toLowerCase().includes(searchValue);

    return matchesPlatform && matchesStatus && matchesSearch;
  });
  
  console.log("Filtered campaigns:", filtered); // helpful log
  displayCampaigns(filtered);
}

// Event listeners
platformFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);
searchButton.addEventListener("click", applyFilters);

// fetch data from backend on load
fetch('/api/campaigns')
.then(res=>res.json())
.then(data=>{
  campaigns = data;
  displayCampaigns(campaigns);
});

// ✅ NEW: Handle form submission for adding new campaign
document.getElementById("campaignForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent reload

  const campaignData = {
    name: document.getElementById("name").value,
    platform: document.getElementById("platform").value,
    status: document.getElementById("status").value,
    impressions: parseInt(document.getElementById("impressions").value),
    clicks: parseInt(document.getElementById("clicks").value),
    spend: parseFloat(document.getElementById("spend").value),
  };

  try {
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(campaignData),
    });

    const result = await res.json();
    alert("Campaign added successfully!");

    // Update frontend UI
    campaigns.push(result);         // Add to local array
    applyFilters();                 // Reapply filters (if any)
  } catch (err) {
    console.error("Error adding campaign:", err);
    alert("Failed to add campaign.");
  }
});
