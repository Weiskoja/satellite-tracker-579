import React, { Component } from 'react';

class Checkboxes extends Component {
    state = { 
        isAccordionOpen: false,
        selectedOwners: []
    }

    toggleAccordion = () => {
        this.setState(prevState => ({ isAccordionOpen: !prevState.isAccordionOpen }));
    }

    handleOwnerChange = (owner) => {
        this.setState(prevState => {
            const selectedOwners = prevState.selectedOwners.includes(owner)
                ? prevState.selectedOwners.filter(o => o !== owner)
                : [...prevState.selectedOwners, owner];

            this.props.onOwnerFilterChange(selectedOwners);
            return { selectedOwners };
        });
    }

    render() {
        const { stations } = this.props;
        const { isAccordionOpen, selectedOwners } = this.state;

        // Extract unique owners
        const uniqueOwners = [...new Set(stations.map(station => station.owner))];

        return (
            <div className='Checkboxes'>
                <button className='AccordionButton' onClick={this.toggleAccordion}>
                    {isAccordionOpen ? 'Hide Filters' : 'Show Filters'}
                </button>
                {isAccordionOpen && (
                    <div className='AccordionContent'>
                        {uniqueOwners.map((owner, idx) => (
                            <div key={idx}>
                                <input 
                                    type="checkbox" 
                                    id={owner} 
                                    name={owner} 
                                    checked={selectedOwners.includes(owner)}
                                    onChange={() => this.handleOwnerChange(owner)} 
                                />
                                <label htmlFor={owner}>{owner}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}

export default Checkboxes;