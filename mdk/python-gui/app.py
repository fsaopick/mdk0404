import tkinter as tk
from tkinter import ttk


class NotesWindow:
    def __init__(self) -> None:
        self.root = tk.Tk()
        self.root.title("Python Notes")
        self.root.geometry("520x340")
        self.root.configure(bg="#f4efe6")

        title = tk.Label(
            self.root,
            text="Контейнер с Tkinter",
            font=("Helvetica", 20, "bold"),
            bg="#f4efe6",
            fg="#2b2d42",
        )
        title.pack(pady=(18, 10))

        subtitle = tk.Label(
            self.root,
            text="Небольшое GUI-приложение на Python для третьего контейнера",
            font=("Helvetica", 11),
            bg="#f4efe6",
            fg="#4f5d75",
        )
        subtitle.pack()

        frame = tk.Frame(self.root, bg="#f4efe6")
        frame.pack(fill="both", expand=True, padx=20, pady=20)

        self.text = tk.Text(
            frame,
            wrap="word",
            font=("Helvetica", 12),
            relief="flat",
            padx=12,
            pady=12,
            bg="#fffdf8",
            fg="#1f2933",
        )
        self.text.insert(
            "1.0",
            "Здесь можно оставить заметки по лабораторной работе:\n"
            "- X11-сокет проброшен в контейнер.\n"
            "- DISPLAY передан через docker-compose.\n"
            "- Приложение запущено в отдельном контейнере.\n",
        )
        self.text.pack(fill="both", expand=True)

        actions = ttk.Frame(self.root)
        actions.pack(fill="x", padx=20, pady=(0, 20))

        clear_button = ttk.Button(actions, text="Очистить", command=self.clear)
        clear_button.pack(side="left")

        sample_button = ttk.Button(actions, text="Заполнить", command=self.fill_sample)
        sample_button.pack(side="left", padx=10)

    def clear(self) -> None:
        self.text.delete("1.0", tk.END)

    def fill_sample(self) -> None:
        self.text.delete("1.0", tk.END)
        self.text.insert(
            "1.0",
            "Пример пользовательского GUI на Python внутри Docker.\n"
            "Можно расширить до трекера задач, таймера или редактора заметок.\n",
        )

    def run(self) -> None:
        self.root.mainloop()


if __name__ == "__main__":
    NotesWindow().run()
