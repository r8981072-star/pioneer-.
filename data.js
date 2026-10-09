/*
  ARCHIVES — add your documents here.
  - cover: path to the first-page image, e.g. "/archives/covers/principia.jpg" (leave "" to show a skeleton)
  - pdf:   path or URL of the PDF, e.g. "/archives/pdfs/principia.pdf" (leave "" to show "PDF coming soon")
  Put uploaded files inside the /public/archives folder.
*/
window.PIONEER_ARCHIVES = [
  { title: "Philosophiæ Naturalis Principia Mathematica", author: "Isaac Newton", year: 1687, field: "Physics", cover: "", pdf: "" },
  { title: "On the Electrodynamics of Moving Bodies", author: "Albert Einstein", year: 1905, field: "Physics", cover: "", pdf: "" },
  { title: "A Dynamical Theory of the Electromagnetic Field", author: "James Clerk Maxwell", year: 1865, field: "Physics", cover: "", pdf: "" },
  { title: "Research on Radioactive Substances", author: "Marie Curie", year: 1904, field: "Chemistry", cover: "", pdf: "" },
  { title: "On the Constitution of Atoms and Molecules", author: "Niels Bohr", year: 1913, field: "Physics", cover: "", pdf: "" },
  { title: "Dialogue Concerning the Two Chief World Systems", author: "Galileo Galilei", year: 1632, field: "Astronomy", cover: "", pdf: "" },
  { title: "A New Radiation", author: "C. V. Raman", year: 1928, field: "Physics", cover: "", pdf: "" },
  { title: "Planck's Law and the Light Quantum Hypothesis", author: "Satyendra Nath Bose", year: 1924, field: "Physics", cover: "", pdf: "" },
  { title: "The Maximum Mass of Ideal White Dwarfs", author: "S. Chandrasekhar", year: 1931, field: "Astronomy", cover: "", pdf: "" },
  { title: "Invariant Variation Problems", author: "Emmy Noether", year: 1918, field: "Mathematics", cover: "", pdf: "" },
  { title: "On the Origin of Species", author: "Charles Darwin", year: 1859, field: "Biology", cover: "", pdf: "" },
  { title: "Molecular Structure of Nucleic Acids", author: "Watson & Crick", year: 1953, field: "Biology", cover: "", pdf: "" },
  { title: "Experimental Researches in Electricity", author: "Michael Faraday", year: 1839, field: "Physics", cover: "", pdf: "" },
  { title: "The Feynman Lectures on Physics, Vol. I", author: "Richard Feynman", year: 1963, field: "Physics", cover: "", pdf: "" },
  { title: "On Computable Numbers", author: "Alan Turing", year: 1936, field: "Mathematics", cover: "", pdf: "" },
  { title: "Particle Creation by Black Holes", author: "Stephen Hawking", year: 1975, field: "Astronomy", cover: "", pdf: "" },
];

/*
  SCIENTISTS — `wiki` is the English Wikipedia page title, used to load the photo and biography.
*/
window.PIONEER_SCIENTISTS = [
  { name: "Albert Einstein", wiki: "Albert_Einstein", field: "Theoretical Physics", years: "1879–1955",
    works: ["Special theory of relativity (1905)", "General theory of relativity (1915)", "Photoelectric effect — Nobel Prize 1921", "Mass–energy equivalence, E = mc²"] },
  { name: "Isaac Newton", wiki: "Isaac_Newton", field: "Physics & Mathematics", years: "1643–1727",
    works: ["Laws of motion and universal gravitation", "Principia Mathematica (1687)", "Co-invention of calculus", "Opticks — theory of light and colour"] },
  { name: "Marie Curie", wiki: "Marie_Curie", field: "Physics & Chemistry", years: "1867–1934",
    works: ["Pioneering research on radioactivity", "Discovery of polonium and radium", "Nobel Prize in Physics (1903)", "Nobel Prize in Chemistry (1911)"] },
  { name: "Galileo Galilei", wiki: "Galileo_Galilei", field: "Astronomy & Physics", years: "1564–1642",
    works: ["Telescopic discovery of Jupiter's moons", "Laws of falling bodies", "Dialogue Concerning the Two Chief World Systems", "Foundations of the scientific method"] },
  { name: "Niels Bohr", wiki: "Niels_Bohr", field: "Quantum Physics", years: "1885–1962",
    works: ["Bohr model of the atom (1913)", "Principle of complementarity", "Nobel Prize in Physics (1922)", "Copenhagen interpretation"] },
  { name: "Richard Feynman", wiki: "Richard_Feynman", field: "Theoretical Physics", years: "1918–1988",
    works: ["Quantum electrodynamics (QED)", "Feynman diagrams", "Path integral formulation", "The Feynman Lectures on Physics"] },
  { name: "Max Planck", wiki: "Max_Planck", field: "Theoretical Physics", years: "1858–1947",
    works: ["Founder of quantum theory", "Planck's constant (h)", "Black-body radiation law", "Nobel Prize in Physics (1918)"] },
  { name: "Michael Faraday", wiki: "Michael_Faraday", field: "Physics & Chemistry", years: "1791–1867",
    works: ["Electromagnetic induction", "Laws of electrolysis", "Invention of the electric motor & dynamo", "Faraday cage"] },
  { name: "James Clerk Maxwell", wiki: "James_Clerk_Maxwell", field: "Mathematical Physics", years: "1831–1879",
    works: ["Maxwell's equations of electromagnetism", "Light as an electromagnetic wave", "Kinetic theory of gases", "First durable colour photograph"] },
  { name: "Erwin Schrödinger", wiki: "Erwin_Schrödinger", field: "Quantum Physics", years: "1887–1961",
    works: ["Schrödinger wave equation", "Schrödinger's cat thought experiment", "Nobel Prize in Physics (1933)", "What Is Life? (1944)"] },
  { name: "Werner Heisenberg", wiki: "Werner_Heisenberg", field: "Quantum Physics", years: "1901–1976",
    works: ["Uncertainty principle", "Matrix mechanics", "Nobel Prize in Physics (1932)", "Contributions to nuclear physics"] },
  { name: "Paul Dirac", wiki: "Paul_Dirac", field: "Theoretical Physics", years: "1902–1984",
    works: ["Dirac equation", "Prediction of antimatter", "Nobel Prize in Physics (1933)", "The Principles of Quantum Mechanics"] },
  { name: "C. V. Raman", wiki: "C._V._Raman", field: "Physics", years: "1888–1970",
    works: ["Raman effect — scattering of light", "Nobel Prize in Physics (1930)", "Acoustics of Indian musical instruments", "Founder of the Raman Research Institute"] },
  { name: "Satyendra Nath Bose", wiki: "Satyendra_Nath_Bose", field: "Mathematical Physics", years: "1894–1974",
    works: ["Bose–Einstein statistics", "Bose–Einstein condensate (theory)", "Bosons are named after him", "Work on unified field theory"] },
  { name: "Subrahmanyan Chandrasekhar", wiki: "Subrahmanyan_Chandrasekhar", field: "Astrophysics", years: "1910–1995",
    works: ["Chandrasekhar limit", "Structure and evolution of stars", "Nobel Prize in Physics (1983)", "Mathematical theory of black holes"] },
  { name: "Homi J. Bhabha", wiki: "Homi_J._Bhabha", field: "Nuclear Physics", years: "1909–1966",
    works: ["Bhabha scattering", "Cascade theory of cosmic rays", "Founder of TIFR", "Father of India's nuclear programme"] },
  { name: "Emmy Noether", wiki: "Emmy_Noether", field: "Mathematics", years: "1882–1935",
    works: ["Noether's theorem — symmetry & conservation", "Foundations of abstract algebra", "Noetherian rings", "Invariant theory"] },
  { name: "Lise Meitner", wiki: "Lise_Meitner", field: "Nuclear Physics", years: "1878–1968",
    works: ["Co-discovery of nuclear fission", "Discovery of protactinium", "Research on radioactivity", "Element meitnerium named in her honour"] },
  { name: "Chien-Shiung Wu", wiki: "Chien-Shiung_Wu", field: "Experimental Physics", years: "1912–1997",
    works: ["Wu experiment — parity violation", "Manhattan Project contributions", "Beta decay research", "Wolf Prize in Physics (1978)"] },
  { name: "Stephen Hawking", wiki: "Stephen_Hawking", field: "Cosmology", years: "1942–2018",
    works: ["Hawking radiation", "Singularity theorems", "A Brief History of Time", "Black hole thermodynamics"] },
];
