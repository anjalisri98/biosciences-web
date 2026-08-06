import React from 'react';

const Products = () => {
  const productList = [
    { name: 'Pharma intermediates', icon: 'fa-capsules', desc: 'APIs, building blocks, custom synthesis' },
    { name: 'Agrochemicals', icon: 'fa-seedling', desc: 'Herbicides, fungicides, plant growth regulators' },
    { name: 'Specialty solvents', icon: 'fa-flask', desc: 'High-purity solvents for R&D and production' },
    { name: 'Organic acids', icon: 'fa-atom', desc: 'Citric, lactic, and specialty acids' },
    { name: 'Polymer additives', icon: 'fa-cubes', desc: 'Stabilizers, plasticizers, flame retardants' },
    { name: 'Custom synthesis', icon: 'fa-microscope', desc: 'Tailored molecules for your application' }
  ];

  return (
    <section style={{ margin: '50px 0 30px' }}>
      <h2 className="section-title">Our chemical portfolio</h2>
      <p className="section-sub">From research quantities to bulk export — all products meet ISO & GMP standards.</p>
      <div className="products-grid">
        {productList.map((p, idx) => (
          <div className="product-card" key={idx}>
            <i className={`fas ${p.icon}`}></i>
            <h4>{p.name}</h4>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;