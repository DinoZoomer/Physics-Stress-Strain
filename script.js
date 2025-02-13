let mass = [];
let extension = [];
let force = [];
let stress = [];
let strain = [];

function addData() {
    let m = parseFloat(prompt("Enter added mass (kg):"));
    if (m === -1) return;
    mass.push(m);

    let ext = parseFloat(prompt("Enter extension from original (m):"));
    extension.push(ext);
}

function plotGraph() {
    let initial = parseFloat(document.getElementById("initialLength").value);
    let diameter = parseFloat(document.getElementById("diameter").value);
    let radius = diameter / 2;
    let crossSectionalArea = Math.PI * radius * radius;

    force = mass.map(m => m * 9.81);
    stress = force.map(f => f / crossSectionalArea);
    strain = extension.map(ext => ext / initial);

    let ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: strain,
            datasets: [{
                label: 'Stress vs Strain',
                data: stress,
                borderColor: 'blue',
                fill: false
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
