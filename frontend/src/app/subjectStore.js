import { create } from 'zustand';
import { devtools, persist, } from 'zustand/middleware';

const subjectStore = (set) => ({
    subjects: [],
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
            subjects: state.subjects.map((subject) => subject.id === subjectId ? {...subject, completed: !subject.completed} : subject)
        }))
    }
})

const useSubjectStore = create(
    devtools(
        persist(subjectStore, {
            name: "subjects"
        })
    ) 
)

export default useSubjectStore;