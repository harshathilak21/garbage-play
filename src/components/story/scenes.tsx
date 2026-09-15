import { useEffect, useState, type ReactNode } from "react";
import {
  Bookshelf,
  Character,
  CodeBlock,
  CycleArrows,
  LibraryBackdrop,
  LibraryWindow,
  ObjectBox,
  PythonAdventureBook,
  ReadingTable,
  RefCounter,
  ReferenceArrow,
  SpeechBubble,
  StatusPanel,
  StickyNote,
} from "./art";
import { QuizCard } from "./Quiz";
import { cn } from "@/lib/utils";

/* ---------- layout helpers ---------- */

function SceneShell({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("scene-enter", className)}>
      {(eyebrow || title) && (
        <header className="mb-6 text-center">
          {eyebrow && <span className="label-chip">{eyebrow}</span>}
          {title && <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{title}</h2>}
        </header>
      )}
      {children}
    </section>
  );
}

function Narration({ children }: { children: ReactNode }) {
  return (
    <blockquote className="scene-card border-l-[6px] border-l-[var(--accent-strong)] p-5">
      <p className="narration">{children}</p>
    </blockquote>
  );
}

function Stage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "scene-card relative overflow-hidden bg-[var(--paper)] p-6 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

function MappingRow({ story, python }: { story: string; python: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-border bg-paper px-4 py-3">
      <span className="font-display text-base font-semibold">{story}</span>
      <ReferenceArrow length={70} />
      <span className="label-chip">{python}</span>
    </div>
  );
}

/* ---------- 1. Introduction ---------- */

function Intro({ onNext }: { onNext?: () => void }) {
  return (
    <SceneShell>
      <Stage className="text-center">
        <LibraryBackdrop />
        <div className="relative">
          <span className="label-chip">PyBay · Python Learning Platform</span>
          <h1 className="mt-5 text-4xl font-semibold sm:text-5xl">
            Would you like to explore Garbage Collection?
          </h1>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-end justify-center gap-6">
            <Bookshelf width={150} />
            <PythonAdventureBook size={110} glow />
            <Bookshelf width={150} />
          </div>
          <button
            type="button"
            onClick={onNext}
            className="mt-10 rounded-full bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            OK, Let’s Explore →
          </button>
        </div>
      </Stage>
    </SceneShell>
  );
}

/* ---------- 2. Everwell Library ---------- */

function EverwellLibrary() {
  return (
    <SceneShell eyebrow="Scene One" title="Everwell Library">
      <Stage>
        <div className="flex flex-wrap items-end justify-center gap-4">
          <Bookshelf width={140} />
          <Bookshelf width={140} />
          <LibraryWindow width={150} />
          <Bookshelf width={140} />
          <Bookshelf width={140} />
        </div>
        <div className="mt-6 flex flex-wrap items-end justify-center gap-4">
          <Bookshelf width={120} />
          <Bookshelf width={120} />
          <Bookshelf width={120} highlightSlot />
          <Bookshelf width={120} />
          <Bookshelf width={120} />
        </div>
      </Stage>
      <div className="mt-6 grid gap-4">
        <Narration>Welcome to Everwell Library.</Narration>
        <Narration>Everwell Library has thousands of books.</Narration>
      </div>
    </SceneShell>
  );
}

/* ---------- 3. The one important book ---------- */

function OneBook() {
  return (
    <SceneShell eyebrow="Scene Two" title="The Python Adventure">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <Stage className="flex flex-col items-center gap-6">
          <Bookshelf width={230} highlightSlot />
          <ReferenceArrow label="this one" length={90} />
          <PythonAdventureBook size={120} glow />
        </Stage>
        <div className="grid gap-4">
          <Narration>
            Among these thousands of books, there is one particular book called “The Python Adventure.”
          </Narration>
          <Narration>
            There is only one copy of “The Python Adventure” in the entire library.
          </Narration>
          <StatusPanel
            rows={[
              { label: "Book", value: "The Python Adventure" },
              { label: "Copies", value: "Exactly one" },
              { label: "Home", value: "Its shelf" },
            ]}
          />
        </div>
      </div>
    </SceneShell>
  );
}


/* ---------- 4. Reading table ---------- */

function TheReadingTable() {
  return (
    <SceneShell eyebrow="Scene Three" title="The Reading Table">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <Narration>
          There’s one special spot in the library: the Reading Table near the window — this is where a book
          goes only while someone is actively reading it.
        </Narration>
        <Stage>
          <div className="flex flex-wrap items-end justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Bookshelf width={160} highlightSlot />
              <span className="label-chip">Shelf</span>
            </div>
            <ReferenceArrow label="only while read" length={110} />
            <div className="flex flex-col items-center">
              <LibraryWindow width={110} />
              <ReadingTable width={240}>
                <PythonAdventureBook size={70} />
              </ReadingTable>
            </div>
          </div>
        </Stage>
      </div>
    </SceneShell>
  );
}

/* ---------- 5. Librarian rule ---------- */

function LibrarianRule() {
  return (
    <SceneShell eyebrow="Scene Four" title="The Librarian’s Rule">
      <Stage>
        <div className="flex flex-wrap items-end justify-center gap-8">
          <Character name="librarian" size={140} />
          <div className="max-w-lg pb-8">
            <SpeechBubble speaker="The Librarian">
              “As long as someone needs this copy, I’ll keep it on the Reading Table. The moment nobody needs
              it anymore, I’ll walk over, pick it up, and put it back on its shelf.”
            </SpeechBubble>
          </div>
          <ReadingTable width={220}>
            <PythonAdventureBook size={64} />
          </ReadingTable>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-center gap-3 rounded-2xl border-2 border-[var(--accent-strong)] bg-accent p-4 text-accent-foreground">
            <strong>Someone needs the book</strong>
            <ReferenceArrow length={70} />
            <strong>Reading Table</strong>
          </div>
          <div className="flex items-center justify-center gap-3 rounded-2xl border-2 border-border bg-secondary p-4">
            <strong>Nobody needs the book</strong>
            <ReferenceArrow length={70} tone="muted" />
            <strong>Shelf</strong>
          </div>
        </div>
      </Stage>
    </SceneShell>
  );
}

/* ---------- 6. Day 1 ---------- */

function Day1() {
  const [step, setStep] = useState(0);
  const steps = [
    "Alex enters the library",
    "She walks to the shelf",
    "She takes The Python Adventure",
    "She sits at the Reading Table and reads",
  ];
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s < 3 ? s + 1 : s)), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <SceneShell eyebrow="Day 1" title="Alex Picks Up The Book">
      <Stage>
        <LibraryBackdrop className="opacity-15" />
        <div className="relative flex flex-wrap items-end justify-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <Bookshelf width={170} highlightSlot={step < 2} bookMissing={step >= 2} />
            <span className="label-chip">Shelf</span>
          </div>

          {step < 3 ? (
            <div className="walk-in">
              <Character name="alex" size={130} holdingBook={step >= 2} />
            </div>
          ) : (
            <div className="flex items-end gap-2">
              <Character name="alex" size={130} seated holdingBook />
            </div>
          )}

          <div className="flex flex-col items-center">
            <LibraryWindow width={110} />
            <ReadingTable width={250} empty={step < 3}>
              {step >= 3 && <PythonAdventureBook size={62} glow />}
            </ReadingTable>
          </div>
        </div>

        <ol className="relative mt-8 flex flex-wrap justify-center gap-3">
          {steps.map((label, i) => (
            <li
              key={label}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                i <= step
                  ? "border-[var(--accent-strong)] bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground",
              )}
            >
              {label}
            </li>
          ))}
        </ol>
      </Stage>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Narration>Alex picks up the book from the shelf and sits at the Reading Table with it.</Narration>
        <StatusPanel
          rows={[
            { label: "Book", value: "The Python Adventure" },
            { label: "Location", value: "Reading Table" },
            { label: "Readers", value: "1", tone: "good" },
            { label: "Status", value: "In Use", tone: "good" },
          ]}
        />
      </div>
    </SceneShell>
  );
}

/* ---------- 7. Day 1 meaning ---------- */

function Day1Meaning() {
  return (
    <SceneShell eyebrow="Day 1 · What it means" title="The Book Is Being Used">
      <Stage className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Character name="alex" size={120} />
          <ReferenceArrow label="Reference / holding the book" length={190} />
          <PythonAdventureBook size={90} />
        </div>
        <RefCounter value={1} label="Readers" />
        <p className="max-w-xl text-center text-sm text-muted-foreground">
          One person is connected to the book. That single connection is the only reason the book stays on
          the Reading Table.
        </p>
      </Stage>
    </SceneShell>
  );
}

/* ---------- 8. Day 2 ---------- */

function Day2() {
  const [passed, setPassed] = useState(false);
  return (
    <SceneShell eyebrow="Day 2" title="Alex Passes The Book To Sam">
      <Stage>
        <LibraryBackdrop className="opacity-15" />
        <div className="relative flex flex-col items-center">
          <div className="flex flex-wrap items-end justify-center gap-6">
            <Character name="alex" size={125} seated holdingBook={!passed} />
            <div className={passed ? "slide-across" : undefined}>
              <PythonAdventureBook size={70} glow />
            </div>
            <Character name="sam" size={125} seated holdingBook={passed} facing="left" />
          </div>
          <ReadingTable width={330} />
          <button
            type="button"
            onClick={() => setPassed((p) => !p)}
            className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            {passed ? "Replay the hand-off" : "Slide the book to Sam"}
          </button>
        </div>

        <div className="relative mt-8 grid gap-4 sm:grid-cols-2">
          <div className={cn("flex items-center justify-center gap-3 rounded-2xl border-2 p-4", passed ? "border-border opacity-45" : "border-[var(--accent-strong)] bg-accent text-accent-foreground")}>
            <strong>Alex</strong>
            <ReferenceArrow length={70} />
            <strong>Book</strong>
          </div>
          <div className={cn("flex items-center justify-center gap-3 rounded-2xl border-2 p-4", passed ? "border-[var(--accent-strong)] bg-accent text-accent-foreground" : "border-border opacity-45")}>
            <strong>Sam</strong>
            <ReferenceArrow length={70} />
            <strong>Book</strong>
          </div>
        </div>
      </Stage>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="grid gap-4">
          <Narration>
            Alex finishes, but instead of walking it back to the shelf herself, she slides it across the table
            to her friend Sam, who’s sitting right there.
          </Narration>
          <Narration>
            The book never left the Reading Table. Someone still needs it — just a different person now.
          </Narration>
        </div>
        <StatusPanel
          rows={[
            { label: "Location", value: "Reading Table" },
            { label: "Readers", value: "1", tone: "good" },
            { label: "Status", value: "Still In Use", tone: "good" },
            { label: "Who", value: passed ? "Sam" : "Alex" },
          ]}
        />
      </div>
    </SceneShell>
  );
}

/* ---------- 9. Day 3 ---------- */

function Day3() {
  const [phase, setPhase] = useState(0); // 0 reading, 1 left, 2 librarian, 3 shelved
  return (
    <SceneShell eyebrow="Day 3" title="The Book Becomes Unused">
      <Stage>
        <LibraryBackdrop className="opacity-15" />
        <div className="relative flex flex-wrap items-end justify-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Bookshelf width={165} bookMissing={phase < 3} highlightSlot={phase === 3} />
            <span className="label-chip">Shelf</span>
          </div>

          {phase >= 2 && phase < 3 && (
            <div className="walk-in">
              <Character name="librarian" size={125} holdingBook={false} />
            </div>
          )}
          {phase === 3 && <Character name="librarian" size={125} />}

          <div className="flex flex-col items-center">
            <LibraryWindow width={100} />
            <ReadingTable width={260} empty={phase >= 3}>
              {phase === 0 && <Character name="sam" size={110} seated holdingBook />}
              {(phase === 1 || phase === 2) && <PythonAdventureBook size={62} />}
            </ReadingTable>
          </div>

          <div className="pb-10">
            <RefCounter value={phase === 0 ? 1 : 0} label="Readers" />
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap justify-center gap-2">
          {["Sam is reading", "Sam leaves — zero readers", "Librarian walks over", "Book returns to shelf"].map(
            (label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setPhase(i)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                  phase === i
                    ? "border-[var(--accent-strong)] bg-accent text-accent-foreground"
                    : "border-border text-muted-foreground hover:border-[var(--accent-strong)]",
                )}
              >
                {label}
              </button>
            ),
          )}
        </div>

        {phase >= 1 && phase < 3 && (
          <p className="scene-enter mt-6 text-center font-display text-4xl font-semibold text-[var(--danger)]">
            ZERO READERS
          </p>
        )}
      </Stage>

      <div className="mt-6 grid gap-4">
        <Narration>
          The librarian notices: nobody’s reading it anymore. She walks over, picks it up, and returns it to
          its shelf.
        </Narration>
        <Narration>
          Nobody had to tell her to — she just checks the table regularly and clears anything no longer being
          read.
        </Narration>
      </div>
    </SceneShell>
  );
}

/* ---------- 10. Visual state summary ---------- */

function StateSummary() {
  return (
    <SceneShell eyebrow="Two states, never a third" title="Reading Table or Shelf">
      <div className="grid gap-6 md:grid-cols-2">
        <Stage className="flex flex-col items-center gap-4">
          <span className="label-chip">In Use</span>
          <Character name="sam" size={100} seated holdingBook />
          <ReadingTable width={230}>
            <PythonAdventureBook size={58} />
          </ReadingTable>
          <p className="text-center text-sm text-muted-foreground">Someone needs the book.</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            Reader exists <ReferenceArrow length={60} /> Book stays on table
          </div>
        </Stage>
        <Stage className="flex flex-col items-center gap-4">
          <span className="label-chip label-chip--muted">Free / Cleaned Up</span>
          <Character name="librarian" size={100} />
          <Bookshelf width={180} highlightSlot />
          <p className="text-center text-sm text-muted-foreground">Nobody needs the book.</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            Zero readers <ReferenceArrow length={60} tone="muted" /> Book returns to shelf
          </div>
        </Stage>
      </div>
      <div className="mt-6">
        <Narration>
          This rule has worked perfectly so far. But there’s one more kind of book in this library where it
          gets tested.
        </Narration>
      </div>
    </SceneShell>
  );
}

/* ---------- 11. Transition ---------- */

function QuizIntro() {
  return (
    <SceneShell>
      <Stage className="text-center">
        <LibraryBackdrop />
        <div className="relative py-10">
          <h2 className="text-4xl font-semibold sm:text-5xl">You already understand the idea.</h2>
          <p className="mt-4 narration mx-auto max-w-xl">
            Let’s see if you can solve the story before we reveal what Python calls it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <Character name="alex" size={100} />
            <Character name="sam" size={100} />
            <Character name="librarian" size={100} />
          </div>
        </div>
      </Stage>
    </SceneShell>
  );
}

/* ---------- 12. Questions ---------- */

function Questions() {
  return (
    <SceneShell eyebrow="Five story questions" title="Solve the story">
      <div className="grid gap-10">
        <QuizCard
          index={1}
          question="What are the only two places the book can be?"
          options={[
            { text: "The Reading Table or the Shelf.", correct: true },
            { text: "The Reading Table or a reader's bag." },
            { text: "The Shelf or the librarian's desk." },
            { text: "Anywhere in the library." },
          ]}
          reason="The Reading Table is where the book sits while someone needs it. The Shelf is where it goes the moment nobody does. There's no third location — those are the only two states the book can ever be in."
          visual={
            <div className="flex flex-col items-center gap-4">
              <PythonAdventureBook size={78} />
              <div className="flex items-center gap-8">
                <ReferenceArrow direction="left" length={90} />
                <ReferenceArrow length={90} />
              </div>
              <div className="flex items-end gap-10">
                <ReadingTable width={180}>
                  <PythonAdventureBook size={48} />
                </ReadingTable>
                <div className="flex flex-col items-center gap-2">
                  <Bookshelf width={140} highlightSlot />
                  <span className="label-chip">Shelf</span>
                </div>
              </div>
            </div>
          }
        />
        <QuizCard
          index={2}
          question="On Day 2, Alex slides the book to Sam instead of the shelf. Why doesn't the librarian take it back?"
          options={[
            { text: "The librarian was on a break." },
            { text: "Someone is still reading it — just a different person now.", correct: true },
            { text: "Alex never released the book." },
            { text: "Sam asked the librarian for permission." },
          ]}
          reason="The librarian's rule only cares whether someone needs the book, not who that someone is. The reader changed, but the book never had zero readers, so it never left the table."
          visual={
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3 opacity-45">
                <Character name="alex" size={80} showLabel={false} />
                <ReferenceArrow tone="muted" length={80} />
                <PythonAdventureBook size={52} title="" />
              </div>
              <div className="flex items-center gap-3">
                <Character name="sam" size={80} showLabel={false} />
                <ReferenceArrow length={80} />
                <PythonAdventureBook size={52} title="" />
              </div>
              <div className="flex items-center gap-3">
                <span className="label-chip">Book</span>
                <ReferenceArrow label="unchanged" length={80} />
                <span className="label-chip">Reading Table</span>
              </div>
            </div>
          }
        />
        <QuizCard
          index={3}
          question="What is the exact moment the librarian takes the book back to the shelf?"
          options={[
            { text: "As soon as Alex finishes." },
            { text: "At closing time each day." },
            { text: "The moment zero people are reading it.", correct: true },
            { text: "When a new reader asks for a different book." },
          ]}
          reason="Alex finishing on Day 2 didn't trigger the return, because Sam picked it up right away. It only goes back once the count of readers actually reaches zero."
          visual={
            <div className="flex flex-col items-center gap-3">
              <RefCounter value={1} label="Readers" />
              <ReferenceArrow length={40} />
              <RefCounter value={0} label="Readers" />
              <ReferenceArrow length={40} tone="danger" />
              <Character name="librarian" size={90} />
              <ReferenceArrow length={40} tone="muted" />
              <Bookshelf width={140} highlightSlot />
            </div>
          }
        />
        <QuizCard
          index={4}
          question="In the Priya-and-Dev twist, why don't Part 1 and Part 2 go back to the shelf even though nobody else needs them?"
          options={[
            { text: "They still point to each other through their printed continuation lines.", correct: true },
            { text: "The librarian forgot about them." },
            { text: "Parts of a book can never be shelved." },
            { text: "They were checked out permanently." },
          ]}
          reason="Part 1 ends with “Continued in Part 2,” and Part 2 opens with “Continued from Part 1.” Each printed line counts as something pointing at the other part, so by the librarian's normal rule neither one ever looks free."
          visual={
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-wrap items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <PythonAdventureBook size={62} title="Part 1" spine="var(--character-priya)" />
                  <p className="max-w-[10rem] rounded-md border border-border bg-[var(--book-page)] px-3 py-2 text-center font-display text-xs italic text-[var(--ink)]">
                    “Continued in Part 2”
                  </p>
                </div>
                <CycleArrows size={160} />
                <div className="flex flex-col items-center gap-2">
                  <PythonAdventureBook size={62} title="Part 2" spine="var(--character-dev)" />
                  <p className="max-w-[10rem] rounded-md border border-border bg-[var(--book-page)] px-3 py-2 text-center font-display text-xs italic text-[var(--ink)]">
                    “Continued from Part 1”
                  </p>
                </div>
              </div>
              <span className="arrow-label">Part 1 → Part 2 → Part 1</span>
            </div>
          }
        />
        <QuizCard
          index={5}
          question="Whose job is it to catch the Priya-and-Dev situation, which the librarian's usual rule misses?"
          options={[
            { text: "Priya and Dev." },
            { text: "The head of the library." },
            { text: "Nobody — it stays forever." },
            { text: "The periodic inspector.", correct: true },
          ]}
          reason="The librarian only checks “is anything pointing at this?” — a check the two parts always pass, since each printed line points at the other. The inspector looks for pairs that only point at each other, with no reader anywhere in the chain."
          visual={
            <div className="flex flex-col items-center gap-4">
              <Character name="inspector" size={110} />
              <div className="flex items-center gap-4">
                <ObjectBox title="Part 1" items={["→ Part 2"]} />
                <CycleArrows size={140} />
                <ObjectBox title="Part 2" items={["→ Part 1"]} />
              </div>
              <span className="rounded-full border-2 border-[var(--danger)] px-5 py-2 font-display text-lg font-semibold text-[var(--danger)]">
                Cycle Found · No Readers
              </span>
            </div>
          }
        />

      </div>
    </SceneShell>
  );
}

/* ---------- 13. Python reveal ---------- */

function PythonReveal() {
  return (
    <SceneShell eyebrow="The translation" title="Now let’s translate the story into Python.">
      <Stage>
        <LibraryBackdrop className="opacity-10" />
        <div className="relative grid gap-3 sm:grid-cols-2">
          <MappingRow story="The Python Adventure" python="Object" />
          <MappingRow story="Reader (Alex / Sam)" python="Reference" />
          <MappingRow story="Number of readers" python="Reference count" />
          <MappingRow story="Reading Table" python="Object still in use" />
          <MappingRow story="Shelf" python="Memory reclaimed" />
          <MappingRow story="Librarian’s check" python="Reference counting" />
          <MappingRow story="Part 1 / Part 2’s printed lines (Priya / Dev)" python="Cyclic reference" />
          <MappingRow story="Inspector" python="Cyclic garbage collector" />
        </div>
      </Stage>
    </SceneShell>
  );
}

/* ---------- 14. Q1 → Python ---------- */

function Q1Python() {
  return (
    <SceneShell eyebrow="Question 1 → Python" title="Two states: in use, or reclaimable">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-4">
          <Narration>Story answer: the Reading Table or the Shelf.</Narration>
          <p className="text-sm text-muted-foreground">
            In Python: an object is either still reachable and in use, or its memory can be reclaimed.
          </p>
        </div>
        <Stage className="flex flex-col items-center gap-5">
          <PythonAdventureBook size={78} />
          <ReferenceArrow length={60} />
          <span className="label-chip">Python Object</span>
          <div className="mt-2 grid w-full gap-3 sm:grid-cols-2">
            <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-[var(--accent-strong)] bg-accent p-4 text-accent-foreground">
              <strong>Object in use</strong>
              <ReferenceArrow length={60} />
              <strong>Memory remains</strong>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-2xl border-2 border-border bg-secondary p-4">
              <strong>No longer reachable</strong>
              <ReferenceArrow length={60} tone="muted" />
              <strong>Memory reclaimed</strong>
            </div>
          </div>
        </Stage>
      </div>
    </SceneShell>
  );
}

/* ---------- 15. Q2 → Python ---------- */

function Q2Python() {
  const [released, setReleased] = useState(false);
  return (
    <SceneShell eyebrow="Question 2 → Python" title="Python counts references, not people">
      <Stage className="flex flex-col items-center gap-6">
        <div className={cn("flex items-center gap-4 transition-opacity", released && "opacity-40")}>
          <Character name="alex" size={95} showLabel={false} />
          <ReferenceArrow tone={released ? "muted" : "primary"} length={140} label="Alex → Object" />
          <span className="label-chip">Object</span>
        </div>
        <div className="flex items-center gap-4">
          <Character name="sam" size={95} showLabel={false} />
          <ReferenceArrow length={140} label="Sam → Object" />
          <span className="label-chip">Object</span>
        </div>
        <RefCounter value={released ? 1 : 2} />
        <button
          type="button"
          onClick={() => setReleased((r) => !r)}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          {released ? "Give Alex the reference back" : "Alex releases her reference"}
        </button>
        <p className="max-w-xl text-center text-sm text-muted-foreground">
          The object remains: Python cares about how many references point at it, not who they belong to.
        </p>
      </Stage>
    </SceneShell>
  );
}

/* ---------- 16. Q3 → Python ---------- */

function Q3Python() {
  const [count, setCount] = useState(2);
  return (
    <SceneShell eyebrow="Question 3 → Python" title="Reference Counting">
      <Stage className="flex flex-col items-center gap-6">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <RefCounter value={2} />
          <ReferenceArrow length={50} />
          <RefCounter value={1} />
          <ReferenceArrow length={50} />
          <RefCounter value={0} />
        </div>
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Try it live
          </span>
          <RefCounter value={count} />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCount((c) => c + 1)}
              className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Add a reference
            </button>
            <button
              type="button"
              onClick={() => setCount((c) => Math.max(0, c - 1))}
              className="rounded-full border-2 border-border px-4 py-2 text-sm font-semibold"
            >
              Release a reference
            </button>
          </div>
          <div className="flex min-h-[130px] flex-col items-center justify-end">
            {count === 0 ? (
              <div className="scene-enter flex flex-col items-center gap-2">
                <span className="font-display text-xl font-semibold text-[var(--danger)]">
                  Object can be reclaimed
                </span>
                <Bookshelf width={150} highlightSlot />
              </div>
            ) : (
              <ReadingTable width={200}>
                <PythonAdventureBook size={52} title="" />
              </ReadingTable>
            )}
          </div>
        </div>
      </Stage>
    </SceneShell>
  );
}

/* ---------- 17. Priya & Dev twist ---------- */

function PriyaDev() {
  const [outside, setOutside] = useState(true);
  return (
    <SceneShell eyebrow="The twist" title="But there’s a problem…">
      <Stage>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <Character name="priya" size={110} />
            <PythonAdventureBook size={62} title="Part 1" spine="var(--character-priya)" />
            <StickyNote>“Part 2 is with Dev.”</StickyNote>
          </div>
          <CycleArrows size={200} />
          <div className="flex flex-col items-center gap-3">
            <Character name="dev" size={110} facing="left" />
            <PythonAdventureBook size={62} title="Part 2" spine="var(--character-dev)" />
            <StickyNote tone="pink" rotate={3}>
              “Part 1 is with Priya.”
            </StickyNote>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => setOutside((o) => !o)}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            {outside ? "Remove every outside reference" : "Bring outside readers back"}
          </button>
          <div className={cn("flex flex-wrap items-center justify-center gap-4 transition-opacity", !outside && "opacity-25")}>
            <Character name="alex" size={80} showLabel={false} />
            <ReferenceArrow tone={outside ? "primary" : "muted"} length={90} label="outside reader" />
            <span className="label-chip">Part 1 / Part 2</span>
          </div>
          <RefCounter value={outside ? 1 : 0} label="Outside References" />
          {!outside && (
            <p className="scene-enter max-w-xl text-center narration">
              Nobody else needs Priya. Nobody else needs Dev. Yet the two notes still point at each other — so
              neither part ever looks free.
            </p>
          )}
        </div>
      </Stage>
    </SceneShell>
  );
}

/* ---------- 18. Q4 → Python: cyclic reference ---------- */

function Q4Python() {
  return (
    <SceneShell eyebrow="Question 4 → Python" title="Cyclic Reference">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <Stage className="flex flex-col items-center gap-4">
          <ObjectBox title="Part 1 Object" items={["Part 1", "→ Part 2"]} />
          <CycleArrows size={190} />
          <ObjectBox title="Part 2 Object" items={["Part 2", "→ Part 1"]} />
        </Stage>
        <div className="grid gap-4">
          <Narration>
            Story answer: the printed continuation lines still point Part 1 at Part 2, and Part 2 back at
            Part 1.
          </Narration>
          <p className="text-sm text-muted-foreground">
            In Python, two objects that reference each other form a <strong>cyclic reference</strong>.
          </p>
          <div className="grid gap-3">
            <RefCounter value={0} label="External References" />
            <div className="ref-counter">
              <span className="ref-counter__label">Internal References</span>
              <span className="ref-counter__value">2</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Reference counting alone can never reclaim this pair: each object keeps the other’s count above
            zero.
          </p>
        </div>
      </div>
    </SceneShell>
  );
}

/* ---------- 18b. Q5 → Python: cyclic garbage collector ---------- */

function Q5Python() {
  return (
    <SceneShell eyebrow="Question 5 → Python" title="Python’s Cyclic Garbage Collector">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="grid gap-4">
          <Narration>Story answer: the periodic inspector.</Narration>
          <p className="text-sm text-muted-foreground">
            In Python that inspector is the <strong>cyclic garbage collector</strong>. It runs periodically —
            not constantly — finds groups of objects that only reference each other, and reclaims them.
          </p>
        </div>
        <Stage className="flex flex-col items-center gap-4">
          <Character name="inspector" size={120} />
          <div className="flex items-center gap-4">
            <ObjectBox title="Part 1" items={["→ Part 2"]} />
            <CycleArrows size={150} />
            <ObjectBox title="Part 2" items={["→ Part 1"]} />
          </div>
          <span className="font-display text-xl font-semibold text-[var(--danger)]">
            Unreachable cycle · reclaimed together
          </span>
        </Stage>
      </div>
    </SceneShell>
  );
}

/* ---------- 19. Inspector ---------- */

function Inspector() {
  const [stage, setStage] = useState(0);
  return (
    <SceneShell eyebrow="The second helper" title="The Periodic Inspector">
      <Stage>
        <LibraryBackdrop className="opacity-12" />
        <div className="relative flex flex-wrap items-center justify-center gap-8">
          <Character name="inspector" size={130} />
          <div className={cn("flex items-center gap-4", stage >= 3 && "opacity-25")}>
            <ObjectBox title="Priya" items={["Part 1"]} dimmed={stage >= 3} />
            <CycleArrows size={150} />
            <ObjectBox title="Dev" items={["Part 2"]} dimmed={stage >= 3} />
          </div>
        </div>

        <div className="relative mt-8 flex flex-wrap justify-center gap-2">
          {["Waiting (not always watching)", "Periodic sweep", "Cycle detected", "Both reclaimed"].map((l, i) => (
            <button
              key={l}
              type="button"
              onClick={() => setStage(i)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider",
                stage === i
                  ? "border-[var(--accent-strong)] bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground",
              )}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="relative mt-6 flex min-h-[70px] flex-col items-center justify-center gap-2 text-center">
          {stage === 1 && <p className="scene-enter narration">The inspector walks the library every so often — not constantly.</p>}
          {stage === 2 && (
            <p className="scene-enter font-display text-3xl font-semibold text-[var(--danger)]">
              CYCLE FOUND · NO READERS ANYWHERE IN THE CHAIN
            </p>
          )}
          {stage === 3 && (
            <p className="scene-enter font-display text-2xl font-semibold text-[var(--accent-strong)]">
              Both parts cleared to the shelf together
            </p>
          )}
        </div>
      </Stage>
    </SceneShell>
  );
}

/* ---------- 20. Final Python model ---------- */

function FinalModel() {
  return (
    <SceneShell eyebrow="One diagram" title="Python Garbage Collection">
      <div className="grid gap-6 md:grid-cols-2">
        <Stage className="flex flex-col items-center gap-4">
          <span className="label-chip">Normal case</span>
          <div className="flex flex-col items-center gap-2">
            <strong>Reference exists</strong>
            <ReferenceArrow length={40} />
            <strong>Object remains</strong>
          </div>
          <RefCounter value={0} />
          <div className="flex flex-col items-center gap-2">
            <ReferenceArrow length={40} tone="danger" />
            <strong>Object can be reclaimed</strong>
          </div>
        </Stage>
        <Stage className="flex flex-col items-center gap-4">
          <span className="label-chip">Cycle case</span>
          <div className="flex items-center gap-3">
            <ObjectBox title="Object A" items={["→ B"]} />
            <CycleArrows size={130} />
            <ObjectBox title="Object B" items={["→ A"]} />
          </div>
          {["No outside references", "Cycle detected", "Cyclic garbage collector", "Objects reclaimed"].map((l, i) => (
            <div key={l} className="flex flex-col items-center gap-1">
              {i > 0 && <ReferenceArrow length={30} tone="muted" />}
              <strong className="text-sm">{l}</strong>
            </div>
          ))}
        </Stage>
      </div>
    </SceneShell>
  );
}

/* ---------- 21. Code challenge 1 ---------- */

function CodeChallenge1() {
  const [step, setStep] = useState(0);
  const lines = ['book = ["Python Basics"]', "reader = book", "reader = None"];
  const refs = step >= 2 ? 1 : step >= 1 ? 2 : 1;
  const [picked, setPicked] = useState<number | null>(null);
  const options = [
    "Free immediately",
    "Still referenced",
    "It moves to another object",
    "It becomes a cyclic reference",
  ];

  return (
    <SceneShell eyebrow="Code challenge 1" title="Can you read the code like the librarian?">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="grid gap-4">
          <CodeBlock lines={lines} activeLine={step} />
          <div className="flex gap-2">
            {lines.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-xs font-semibold",
                  step === i ? "border-[var(--accent-strong)] bg-accent text-accent-foreground" : "border-border",
                )}
              >
                Line {i + 1}
              </button>
            ))}
          </div>
          <h3 className="mt-2 text-xl font-semibold">
            Is the object still being referenced, or is it free to be cleared?
          </h3>
          <ul className="grid gap-2">
            {options.map((o, i) => (
              <li key={o}>
                <button
                  type="button"
                  disabled={picked !== null}
                  onClick={() => setPicked(i)}
                  className={cn(
                    "w-full rounded-xl border-2 border-border bg-paper px-4 py-2.5 text-left text-sm",
                    picked !== null && i === 1 && "border-[var(--accent-strong)] bg-accent text-accent-foreground",
                    picked === i && i !== 1 && "border-[var(--danger)] text-[var(--danger)]",
                  )}
                >
                  <span className="mr-2 font-mono text-xs opacity-60">{String.fromCharCode(65 + i)}</span>
                  {o}
                </button>
              </li>
            ))}
          </ul>
          {picked !== null && (
            <p className="scene-enter rounded-2xl bg-secondary/60 p-4 text-sm">
              Correct answer: <strong>B. Still referenced</strong> — <code className="font-mono">book</code>{" "}
              still points to the list object, so its count never reaches zero.
            </p>
          )}
        </div>

        <Stage className="flex flex-col items-center justify-center gap-5">
          <div className={cn("flex items-center gap-3", step < 0 && "opacity-0")}>
            <span className="label-chip">book</span>
            <ReferenceArrow length={110} />
            <ObjectBox title="list object" items={['"Python Basics"']} />
          </div>
          <div className={cn("flex items-center gap-3 transition-opacity", step >= 2 ? "opacity-20" : step >= 1 ? "opacity-100" : "opacity-0")}>
            <span className="label-chip">reader</span>
            <ReferenceArrow tone={step >= 2 ? "muted" : "primary"} length={110} />
            <span className="label-chip">same object</span>
          </div>
          <RefCounter value={refs} label="References" />
          {step >= 2 && <p className="text-sm text-muted-foreground">reader released — but book still holds it.</p>}
        </Stage>
      </div>
    </SceneShell>
  );
}

/* ---------- 22. Code challenge 2 ---------- */

function CodeChallenge2() {
  const [step, setStep] = useState(0);
  const lines = ["priya = [1]", "dev = [2]", "", "priya.append(dev)", "dev.append(priya)", "", "priya = None", "dev = None"];
  const [picked, setPicked] = useState<number | null>(null);
  const options = ["Free to be cleared right away", "It needs the periodic inspector"];
  const outsideGone = step >= 6;

  return (
    <SceneShell eyebrow="Code challenge 2" title="The cycle in code">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="grid gap-4">
          <CodeBlock lines={lines} activeLine={step} />
          <div className="flex flex-wrap gap-2">
            {[0, 1, 3, 4, 6, 7].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setStep(i)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold",
                  step === i ? "border-[var(--accent-strong)] bg-accent text-accent-foreground" : "border-border",
                )}
              >
                Line {i + 1}
              </button>
            ))}
          </div>
          <h3 className="mt-2 text-xl font-semibold">
            Is this free to be cleared right away, or does it need the periodic inspector?
          </h3>
          <ul className="grid gap-2">
            {options.map((o, i) => (
              <li key={o}>
                <button
                  type="button"
                  disabled={picked !== null}
                  onClick={() => setPicked(i)}
                  className={cn(
                    "w-full rounded-xl border-2 border-border bg-paper px-4 py-2.5 text-left text-sm",
                    picked !== null && i === 1 && "border-[var(--accent-strong)] bg-accent text-accent-foreground",
                    picked === 0 && i === 0 && "border-[var(--danger)] text-[var(--danger)]",
                  )}
                >
                  {o}
                </button>
              </li>
            ))}
          </ul>
          {picked !== null && (
            <p className="scene-enter rounded-2xl bg-secondary/60 p-4 text-sm leading-relaxed">
              Nobody outside is holding either box anymore. But the two boxes still reference each other. This
              is a reference cycle, so cyclic garbage collection is needed to detect the unreachable cycle and
              reclaim it.
            </p>
          )}
        </div>

        <Stage className="flex flex-col items-center justify-center gap-5">
          <div className={cn("flex items-center gap-6 transition-opacity", outsideGone && "opacity-20")}>
            <span className="label-chip">priya</span>
            <span className="label-chip">dev</span>
          </div>
          <div className="flex items-center gap-4">
            <ObjectBox title="Priya Box" items={step >= 3 ? ["1", "→ Dev"] : ["1"]} />
            {step >= 4 ? <CycleArrows size={150} /> : step >= 3 ? <ReferenceArrow length={110} /> : <span className="w-10" />}
            <ObjectBox title="Dev Box" items={step >= 4 ? ["2", "→ Priya"] : ["2"]} />
          </div>
          <RefCounter value={outsideGone ? 0 : 2} label="Outside References" />
          {outsideGone && (
            <p className="scene-enter text-center text-sm font-semibold text-[var(--danger)]">
              Outside references = 0, but Priya ↔ Dev remains.
            </p>
          )}
        </Stage>
      </div>
    </SceneShell>
  );
}

/* ---------- 23. Final summary ---------- */

function FinalSummary() {
  return (
    <SceneShell eyebrow="Wrap up" title="So, what did the library teach us?">
      <Stage>
        <LibraryBackdrop className="opacity-15" />
        <div className="relative flex flex-wrap items-end justify-center gap-6">
          <Bookshelf width={130} highlightSlot />
          <Character name="alex" size={95} />
          <Character name="sam" size={95} />
          <Character name="librarian" size={95} />
          <Character name="inspector" size={95} />
          <Bookshelf width={130} />
        </div>
        <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
          <MappingRow story="The Book" python="Object" />
          <MappingRow story="Alex / Sam" python="References" />
          <MappingRow story="Number of Readers" python="Reference Count" />
          <MappingRow story="Zero Readers" python="Object can be reclaimed" />
          <MappingRow story="Priya ↔ Dev" python="Cyclic Reference" />
          <MappingRow story="Inspector" python="Cyclic Garbage Collector" />
        </div>
        <p className="relative mx-auto mt-8 max-w-2xl text-center narration">
          Python automatically manages memory by reclaiming objects that are no longer needed. Reference
          counting handles objects whose references drop to zero, while cyclic garbage collection helps detect
          unreachable reference cycles.
        </p>
      </Stage>
    </SceneShell>
  );
}

/* ---------- exported chapter list ---------- */

export const chapters: {
  id: string;
  nav: string;
  render: (ctx: { onNext: () => void }) => ReactNode;
}[] = [
  { id: "intro", nav: "Introduction", render: ({ onNext }) => <Intro onNext={onNext} /> },
  { id: "library", nav: "Everwell Library", render: () => <EverwellLibrary /> },
  { id: "book", nav: "The One Book", render: () => <OneBook /> },
  { id: "table", nav: "Reading Table", render: () => <TheReadingTable /> },
  { id: "rule", nav: "Library Rule", render: () => <LibrarianRule /> },
  { id: "day1", nav: "Day 1 — Alex", render: () => <Day1 /> },
  { id: "day1-meaning", nav: "What It Means", render: () => <Day1Meaning /> },
  { id: "day2", nav: "Day 2 — Sam", render: () => <Day2 /> },
  { id: "day3", nav: "Day 3 — Return", render: () => <Day3 /> },
  { id: "summary", nav: "Story Summary", render: () => <StateSummary /> },
  { id: "twist", nav: "Priya & Dev", render: () => <PriyaDev /> },
  { id: "inspector", nav: "The Inspector", render: () => <Inspector /> },
  { id: "quiz-intro", nav: "You Already Know", render: () => <QuizIntro /> },
  { id: "questions", nav: "Five Questions", render: () => <Questions /> },
  { id: "reveal", nav: "Python Reveal", render: () => <PythonReveal /> },
  { id: "q1-python", nav: "Q1 → Python", render: () => <Q1Python /> },
  { id: "q2-python", nav: "Q2 → Python", render: () => <Q2Python /> },
  { id: "q3-python", nav: "Reference Counting", render: () => <Q3Python /> },
  { id: "q4-python", nav: "Q4 → Cyclic Reference", render: () => <Q4Python /> },
  { id: "q5-python", nav: "Q5 → Cyclic GC", render: () => <Q5Python /> },
  { id: "model", nav: "Final Model", render: () => <FinalModel /> },
  { id: "code1", nav: "Code Challenge 1", render: () => <CodeChallenge1 /> },
  { id: "code2", nav: "Code Challenge 2", render: () => <CodeChallenge2 /> },
  { id: "final", nav: "Final Summary", render: () => <FinalSummary /> },
];
