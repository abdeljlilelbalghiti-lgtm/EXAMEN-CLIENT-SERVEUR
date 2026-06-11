const API = "http://localhost:3000/api";

let selectedCandidate = null;

async function loadCandidates() {
    const container = document.getElementById("candidates");
    const messageEl = document.getElementById("message");

    try {
        messageEl.innerText = "";
        container.innerHTML = "";

        const res = await fetch(`${API}/candidates`);
        if (!res.ok) {
            const err = await res.json().catch(() => null);
            throw new Error(err?.message || `Erreur HTTP: ${res.status}`);
        }

        const data = await res.json();

        data.forEach(c => {
            const div = document.createElement("div");
            div.classList.add("candidate");

            div.innerHTML = `
                <h3>${c.name}</h3>
                <p>${c.program}</p>
                <button onclick="selectCandidate(${c.id})">Voter</button>
            `;

            container.appendChild(div);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des candidats :", error);
        messageEl.innerText = "Impossible de charger les candidats.";
    }
}

function selectCandidate(id) {
    selectedCandidate = id;
    alert("Candidat sélectionné !");
}

async function submitVote() {
    const student_id = document.getElementById("studentId").value;
    const messageEl = document.getElementById("message");

    if (!student_id) {
        messageEl.innerText = "Veuillez saisir votre identifiant étudiant.";
        return;
    }

    if (!selectedCandidate) {
        messageEl.innerText = "Veuillez sélectionner un candidat.";
        return;
    }

    try {
        messageEl.innerText = "Envoi du vote...";

        const res = await fetch(`${API}/vote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                student_id: student_id,
                candidate_id: selectedCandidate
            })
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
            messageEl.innerText = data.message || "Vote refusé.";
            return;
        }

        messageEl.innerText = data.message || "Vote enregistré avec succès !";
    } catch (error) {
        console.error(error);
        messageEl.innerText = "Erreur réseau.";
    }
}

loadCandidates();

