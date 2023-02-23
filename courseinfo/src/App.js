const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Course = ( {course} ) => {
  const sumOfExercises = () => 
    course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sumOfExercises={sumOfExercises()} />
    </div>
  )
}

const Part = ( {name, exercises} ) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({ sumOfExercises }) => {
  return <p>Number of exercises {sumOfExercises}</p>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => 
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>  
  )
}

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => 
        <Course course={course} />
      )}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App