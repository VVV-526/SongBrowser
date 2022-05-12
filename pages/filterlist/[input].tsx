import Layout from "../../components/layout"
import Search from "../../components/search"
import Heading from "../../components/heading"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import SongList from '../../components/songlist'
import { db } from "../firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { SonglistType, SongWithId } from "../../types"


const songRef = collection(db, "songs");

const FilterPage = () => {
  const router = useRouter()
  const { input } = router.query;
  const [songs, setSongs] = useState<SongWithId[] | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(songRef, (querySnapshot) => {
      const songData = querySnapshot.docs.map(
        (doc) => ({ ...doc.data() as SonglistType, id: doc.id } as SongWithId)
      )
      if (input) {
        setSongs(songData.filter(song => song.artist_name === input || song.song_name === input || song.album_name === input));
      }
    })
    return unsubscribe;
  }, [input])

  return (
    <Layout title="Filterlist">
      <Search></Search>
      <Heading></Heading>
      {songs ? <SongList songs={songs} /> : <div />}
    </Layout>
  )
}

export default FilterPage
