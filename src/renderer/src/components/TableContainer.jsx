import React, { useContext } from 'react';
import { roundContext } from '../../../shared/context.jsx';
import TrackContainter from './TrackContainer.jsx';

function TableContainer() {
    const round = useContext(roundContext);
    
    return(
        <>
        <table className='techniques-table'>
            <thead>
                <tr className='round-number'>
                    <th colSpan={8}>ROUND {round}</th>
                </tr>
                <tr className='stance-row'>
                    <th colSpan={1}></th>
                    <th colSpan={2}>OPEN</th>
                    <th colSpan={2}>CLOSED</th>
                    <th colSpan={3}>SECTION</th>
                </tr>
                <tr className='section-row'>
                    <th style={{width: "10%"}}>TECHNIQUES</th>
                    <th>LEFT</th>
                    <th>RIGHT</th>
                    <th>LEFT</th>
                    <th>RIGHT</th>
                    <th>TRUNK</th>
                    <th>HEAD</th>
                    <th># SCORED</th>
                </tr>
            </thead>
            <tbody>
                <TrackContainter attack="APAL" />
                <TrackContainter attack="SIDE" />
                <TrackContainter attack="ROUNDHOUSE" />
                <TrackContainter attack="BACK KICK" />
                <TrackContainter attack="HOOK" />
                <TrackContainter attack="SPIN HOOK" />
                <TrackContainter attack="AXE" />
                <TrackContainter attack="CRESCENT" />
                <TrackContainter attack="TWIST" />
                <TrackContainter attack="DOUBLE" />
                <TrackContainter attack="360" />
                <TrackContainter attack="PUNCH" />
                <TrackContainter attack="CUT" />
                <TrackContainter attack="CANCEL" />
            </tbody>
        </table>
        </>
    )
}

export default TableContainer;