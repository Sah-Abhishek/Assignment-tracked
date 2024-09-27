import { create } from 'zustand';
import { devtools, persist, } from 'zustand/middleware';
import axios from 'axios';

const subjectStore = (set) => ({
    subjects: [],
    loading: false,
    error: null,
    addSubject: (subject) => {
        set((state) => ({
            subjects: [subject, ...state.subjects],
        }))
    },
    removeSubject: (subjectId) => {
        set((state) => ({
            subjects: state.subjects.filter((s) => s.id !== subjectId)
        }))
    },
    toggleSubjectStatus: (subjectId) => {
        set((state) => ({
            subjects: state.subjects.map((subject) => subject.id === subjectId ? { ...subject, completed: !subject.completed } : subject)
        }))
    },
    sendData: async (newData, token) => {
        // Send jwt token directly from here
        set({ loading: true, error: null });
        try {
            const respose = await axios.post('http://localhost:3000/addsubject', newData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            // console.log("Again token from subjectStore", token);
            // Update the subjects state
            set((state) => ({
                subject: [state.subject, ...state.subjects], loading: false,
            }))


        } catch (error) {
            set({ loading: false, error: error.message });
        }
    },
    fetchSubjects: async ( token ) => {
        set({ loading: true, error: null });
        try{
            const response = await axios.get('http://localhost:3000/subjects',
                {
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            set({ subjects: response.data.data, loading: false })
        }catch(error){
            set({ error: error.message, loading: false })
        }
    }
})

const useSubjectStore = create(
    devtools(
        subjectStore
    )
)

export default useSubjectStore;