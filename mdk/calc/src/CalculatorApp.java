import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.SwingConstants;
import javax.swing.SwingUtilities;

public class CalculatorApp extends JFrame {
    private final JTextField display = new JTextField("0");
    private String currentValue = "";
    private double leftOperand = 0.0;
    private String operator = "";
    private boolean resetDisplay = false;

    public CalculatorApp() {
        super("Swing Calculator");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(360, 480);
        setLocationRelativeTo(null);
        setResizable(false);

        display.setHorizontalAlignment(SwingConstants.RIGHT);
        display.setEditable(false);
        display.setFont(new Font(Font.SANS_SERIF, Font.BOLD, 28));
        display.setBackground(new Color(250, 250, 250));
        display.setBorder(BorderFactory.createEmptyBorder(16, 16, 16, 16));

        JPanel panel = new JPanel(new GridLayout(5, 4, 10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(16, 16, 16, 16));

        String[] buttons = {
            "C", "+/-", "%", "/",
            "7", "8", "9", "*",
            "4", "5", "6", "-",
            "1", "2", "3", "+",
            "0", ".", "=", ""
        };

        for (String label : buttons) {
            if (label.isEmpty()) {
                panel.add(new JPanel());
                continue;
            }

            JButton button = new JButton(label);
            button.setFont(new Font(Font.SANS_SERIF, Font.BOLD, 20));
            button.addActionListener(this::handleButton);
            panel.add(button);
        }

        add(display, BorderLayout.NORTH);
        add(panel, BorderLayout.CENTER);
    }

    private void handleButton(ActionEvent event) {
        String command = event.getActionCommand();

        if ("0123456789".contains(command)) {
            appendDigit(command);
            return;
        }

        switch (command) {
            case "." -> appendDot();
            case "C" -> clear();
            case "+/-" -> toggleSign();
            case "%" -> percent();
            case "+", "-", "*", "/" -> setOperator(command);
            case "=" -> calculate();
            default -> {
            }
        }
    }

    private void appendDigit(String digit) {
        if (resetDisplay || "0".equals(display.getText())) {
            display.setText(digit);
            resetDisplay = false;
        } else {
            display.setText(display.getText() + digit);
        }
        currentValue = display.getText();
    }

    private void appendDot() {
        if (resetDisplay) {
            display.setText("0.");
            resetDisplay = false;
        } else if (!display.getText().contains(".")) {
            display.setText(display.getText() + ".");
        }
        currentValue = display.getText();
    }

    private void clear() {
        currentValue = "";
        leftOperand = 0.0;
        operator = "";
        resetDisplay = false;
        display.setText("0");
    }

    private void toggleSign() {
        double value = Double.parseDouble(display.getText());
        value *= -1;
        display.setText(format(value));
        currentValue = display.getText();
    }

    private void percent() {
        double value = Double.parseDouble(display.getText());
        value /= 100.0;
        display.setText(format(value));
        currentValue = display.getText();
    }

    private void setOperator(String nextOperator) {
        leftOperand = Double.parseDouble(display.getText());
        operator = nextOperator;
        resetDisplay = true;
    }

    private void calculate() {
        if (operator.isEmpty()) {
            return;
        }

        double rightOperand = Double.parseDouble(display.getText());
        double result;

        switch (operator) {
            case "+" -> result = leftOperand + rightOperand;
            case "-" -> result = leftOperand - rightOperand;
            case "*" -> result = leftOperand * rightOperand;
            case "/" -> result = rightOperand == 0.0 ? 0.0 : leftOperand / rightOperand;
            default -> result = rightOperand;
        }

        display.setText(format(result));
        currentValue = display.getText();
        leftOperand = result;
        operator = "";
        resetDisplay = true;
    }

    private String format(double value) {
        if (value == (long) value) {
            return Long.toString((long) value);
        }
        return Double.toString(value);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            CalculatorApp app = new CalculatorApp();
            app.setVisible(true);
        });
    }
}
