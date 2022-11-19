<p align='center'>
  <img src='./docs/scarf.png' height='100' />
</p>

# Vision of project (WHY, WHAT and some HOW)
with some thoughts

Developers want easier DX, so they use f*cking js (joke, but truth) for backend. As for frontend typescript is super. Please don't use javascript.
So Zima should keep around same DX as working with typescript backend. But have c++/rust/any-other-fast-lang under the hood. We will call it 'design backend on frontend'

Should support different DBs. Because MySQL can be better choise than Postgresql potentually sometimes (+ there is PlanetScale). Make it easy to add other **SQL** DBs by implementing interface or abstract class. Problems: some differences in sql syntax (as in create table, select, ...); additional libs for special DBs (that's where Rust looks better a bit).

Always keep in mind:
## SPEED MUST BE A FEATURE OF ZIMA

[QUESTIONS AND DECISIONS](./docs/decisions.md)