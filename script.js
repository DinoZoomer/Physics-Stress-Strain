function plotGraph() {
    let initial = parseFloat(document.getElementById("initialLength").value);
    let diameter = parseFloat(document.getElementById("diameter").value);
    
    if (isNaN(initial) || isNaN(diameter) || initial <= 0 || diameter <= 0) {
        alert("Please enter valid Initial Length and Diameter values.");
        return;
    }

    let radius = diameter / 2;
    let crossSectionalArea = Math.PI * radius * radius;

    let masses = document.querySelectorAll(".mass");
    let extensions = document.querySelectorAll(".extension");

    let mass = [], extension = [], force = [], stress = [], strain = [];

    masses.forEach((m, index) => {
        let massValue = parseFloat(m.value);
        let extValue = parseFloat(extensions[index].value);

        if (!isNaN(massValue) && !isNaN(extValue)) {
            mass.push(massValue);
            extension.push(extValue);
        }
    });

    if (mass.length === 0 || extension.length === 0) {
        alert("Please add valid mass and extension values.");
        return;
    }

    // Calculate force, stress, and strain correctly
    force = mass.map(m => m * 9.81);
    stress = force.map(f => f / crossSectionalArea);
    strain = extension.map(ext => ext / initial);

    console.log("Masses:", mass);
    console.log("Extensions:", extension);
    console.log("Forces:", force);
    console.log("Stress:", stress);
    console.log("Strain:", strain);

    // Ensure we clear old graph before drawing a new one
    let chartStatus = Chart.getChart("myChart"); 
    if (chartStatus !== undefined) {
        chartStatus.destroy();
    }

    let ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Stress vs Strain',
                data: strain.map((s, i) => ({ x: s, y: stress[i] })), // Properly map values
                borderColor: 'blue',
                showLine: true
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Strain' } },
                y: { title: { display: true, text: 'Stress (Pa)' } }
            }
        }
    });
}
function addRow() {
    let table = document.getElementById("tableBody"); // Use explicit tbody reference
    let newRow = table.insertRow();
    
    let massCell = newRow.insertCell(0);
    let extCell = newRow.insertCell(1);
    let actionCell = newRow.insertCell(2);

    massCell.innerHTML = `<input type="number" step="0.01" class="mass">`;
    extCell.innerHTML = `<input type="number" step="0.01" class="extension">`;
    actionCell.innerHTML = `<button onclick="deleteRow(this)">Delete</button>`;
}

function deleteRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
