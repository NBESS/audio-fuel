import React, { useEffect, useState } from 'react';
import axios from 'axios';




export default function SearchForm() {
    const [data, setData] = useState([]);
    const [url, setUrl] = useState(`https://api.spotify.com/v1`);
    const [query, setQuery] = '/browse/categories';

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(url)

            setData(result.data)
        }
        fetchData()
    }, [url])

    return (
        <>
            
            <div>
                <input
                    type='text'
                    // value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button
                    type='button'
                    onClick={() => {
                        setUrl(`https://api.spotify.com/v1${query}`)
                    }}
                >
                    Find
                </button>
            </div>
        </>
    )
}
